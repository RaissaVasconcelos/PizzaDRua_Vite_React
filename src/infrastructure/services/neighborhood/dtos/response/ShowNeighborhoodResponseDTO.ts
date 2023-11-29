export interface ShowNeighborhoodResponseDTO {
  id: string;
  name: string;
  tax: string;
  status: "ACTIVE" | "DISABLE";
}