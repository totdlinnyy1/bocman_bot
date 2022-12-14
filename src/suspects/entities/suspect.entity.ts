import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { VideoEntity } from '../../videos/entities/video.entity'

@Entity('suspect')
export class SuspectEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    who_complained: number

    @ManyToOne(() => VideoEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    video: VideoEntity

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    updatedAt: Date
}
