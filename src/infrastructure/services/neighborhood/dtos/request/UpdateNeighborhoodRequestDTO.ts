export interface UpdateNeighborhoodRequestDTO {
    id: string;
    name: string;
    tax: string;
    status: "ACTIVE" | "DISABLE";
}