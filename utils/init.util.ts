import { InitialDataType } from "@contexts/initial-data";
import { AggregateRoot } from "@mx-space/api-client";
import { GConfig } from "types/theme-config";
import { apiClient } from "./request.util";

export async function getInitData(): Promise<InitialDataType> {
  const [status, configState] = await Promise.allSettled([
    apiClient.aggregate.getAggregateData(),
    apiClient.snippet.getByReferenceAndName<GConfig>(
      'theme',
      process.env.NEXT_PUBLIC_THEME_NAME || 'G'
    )
  ]);

  let data: AggregateRoot | null = null;
  let snippet: GConfig | null = null;
  let reason = undefined as undefined | string;
  if (status.status === 'fulfilled') {
    data = status.value;
  } else {
    reason = status?.reason;
    console.error(`[getInitData] getAggregateData error: ${reason}`)
  }

  if (configState.status === 'fulfilled') {
    snippet = { ...configState.value };
  } else {
    snippet = null;
  }

  // @ts-ignore
  return { aggregateData: data, config: snippet, reason }
}