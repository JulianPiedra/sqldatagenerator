export interface IConvert {
    tableName: string,
    allData: any[],
    format: string,
}

export interface IModalComponent {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: number, valueMap: string) => void;
}