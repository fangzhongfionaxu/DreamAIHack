
// Database adapter - abstracts database operations
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type TableName = keyof Database['public']['Tables'];

export interface QueryOptions {
  select?: string;
  order?: { column: string; ascending?: boolean };
  limit?: number;
  offset?: number;
  filters?: Array<{
    column: string;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in';
    value: any;
  }>;
}

export class DatabaseAdapter {
  static async query<T extends TableName>(
    table: T, 
    options: QueryOptions = {}
  ): Promise<any[]> {
    let query = supabase
      .from(table)
      .select(options.select || '*');

    // Apply filters
    if (options.filters) {
      options.filters.forEach(filter => {
        query = (query as any)[filter.operator](filter.column, filter.value);
      });
    }

    // Apply ordering
    if (options.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending ?? true 
      });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, (options.offset + (options.limit || 50)) - 1);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }
    
    return data || [];
  }

  static async insert<T extends TableName>(
    table: T, 
    data: any
  ): Promise<any> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    return result;
  }

  static async update<T extends TableName>(
    table: T, 
    id: string, 
    data: any
  ): Promise<any> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Database update failed: ${error.message}`);
    }

    return result;
  }

  static async delete<T extends TableName>(table: T, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Database delete failed: ${error.message}`);
    }
  }
}
