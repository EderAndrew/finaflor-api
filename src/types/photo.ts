export type Photo = {
    id?: number;
    selected: boolean;
    position: number;
    createdAt: Date | null;
    updatedAt: Date;
    pic_name: string;
    pic_url: string;
    girl_id: number;
}