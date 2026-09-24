export interface Asset {
  _id?: string;
  assetTag?: string;
  assetName: string;
  category: 'Systems' | 'Electronics' | 'Accessories' | 'Furniture' | 'SIM' | 'Pantry Items' | 'Miscellaneous';
  assetType: 'Fixed Asset' | 'Current Asset';
  brand: string;
  deviceModel: string;
  serialNumber: string;
  purchaseDate: string;
  purchaseCost?: number;
  warrantyEndDate?: string;
  specs?: Record<string, any>;
  status?: string;
  assignedTo?: string | null;
  billStatus?: 'Yes' | 'No' | 'NA';
  billNumber?: string;
  department?: string;
  handoverDate?: string;
  replacement?: string;
  writeoff?: boolean;
  invoiceFiles?: string[];
  maintenanceHistory?: { date: string; description: string }[];
  notes?: string;
}