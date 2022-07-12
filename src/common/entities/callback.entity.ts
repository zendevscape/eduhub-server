import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('callbacks')
export class Callback {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    unique: true,
    name: 'payload_id',
  })
  public payloadId: string;

  @Column()
  public payload: string;

  @CreateDateColumn()
  public created: Date;
}
