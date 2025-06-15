
// Database adapter - abstracts database operations
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";

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
  static async query<T = any>(
    table: string, 
    options: QueryOptions = {}
  ): Promise<T[]> {
    let query = supabase
      .from(table)
      .select(options.select || '*');

    // Apply filters
    if (options.filters) {
      options.filters.forEach(filter => {
        query = query[filter.operator](filter.column, filter.value);
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
    
    return data as T[];
  }

  static async insert<T = any>(table: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    return result as T;
  }

  static async update<T = any>(
    table: string, 
    id: string, 
    data: Partial<T>
  ): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Database update failed: ${error.message}`);
    }

    return result as T;
  }

  static async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Database delete failed: ${error.message}`);
    }
  }
}
