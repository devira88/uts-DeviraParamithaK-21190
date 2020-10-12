export interface Item{
    id: string;
    nama: string;
    jenis: string;
    foto: string;
    merek: string;
    model: string;
    deskripsi: {
        baseClock: string;
        boostClock: string;
        jumlahCore: string;
        thread: string;
        speed: string;
        ukuran: string;
        chipset: string;
        merkProcessor: string;
    };
    harga: number;
    stok: number;
}
