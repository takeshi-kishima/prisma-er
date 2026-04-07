export interface JSONTableSchema {
  refs: JSONTableRef[];
  enums: JSONTableEnum[];
  tables: JSONTableTable[];
}

export interface JSONTableEnum {
  name: string;
  values: Array<{ name: string; note?: string }>;
}

export interface JSONTableRef {
  name?: string | null;
  endpoints: Array<{
    relation: string;
    tableName: string;
    fieldNames: string[];
  }>;
}

export interface JSONTableField {
  name: string;
  pk?: boolean;
  unique?: boolean;
  note?: string;
  increment?: boolean;
  not_null?: boolean;
  dbdefault?: string | number | boolean | null;
  type: { type_name: string; is_enum: boolean };
  is_relation: boolean;
  relational_tables?: string[] | null;
}

export interface JSONTableIndexColumn {
  type?: string;
  value?: string;
}

export interface JSONTableIndex {
  unique?: boolean;
  type?: string;
  name?: string;
  note?: string;
  pk?: boolean;
  columns: JSONTableIndexColumn[];
}

export interface JSONTableTable {
  name: string;
  note?: string;
  headerColor?: string;
  fields: JSONTableField[];
  indexes: JSONTableIndex[];
}
