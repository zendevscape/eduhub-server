import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('callbacks')
export class Callback {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    unique: true,
  })
  public payload_id: string;

  @Column()
  public payload: string;

  @CreateDateColumn()
  public created: Date;
}
