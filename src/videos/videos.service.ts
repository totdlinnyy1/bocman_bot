import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { findLimit } from '../constants/constants'

import { CreateVideoDto } from './dtos/createVideo.dto'
import { VideoEntity } from './entities/video.entity'

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(VideoEntity)
        private readonly _videosRepository: Repository<VideoEntity>,
    ) {}

    async findAllVideos(skip: number): Promise<VideoEntity[]> {
        return await this._videosRepository.find({ skip, take: findLimit })
    }

    async findVideo(message_id: number): Promise<VideoEntity | undefined> {
        return await this._videosRepository.findOne({ where: { message_id } })
    }

    async findVideoByText(text: string): Promise<VideoEntity | undefined> {
        const formattedQuery = text.trim().replace(/ /g, ' & ')
        return await this._videosRepository
            .createQueryBuilder('video')
            .where(
                `to_tsvector('simple',video.text) @@ to_tsquery('simple', :query)`,
                { query: `${formattedQuery}:*` },
            )
            .getOne()
    }

    async saveVideo(data: CreateVideoDto): Promise<VideoEntity> {
        return await this._videosRepository.save(data)
    }

    async videosCount(): Promise<number> {
        return await this._videosRepository.count()
    }
}
