"use client";

import { useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import { apiGetVocabularies } from "@/layers/data/api/resources.api";
import { mapApiVocabulary } from "@/layers/data/api/mappers";
import type { VocabularyWord } from "@/layers/domain/types";
import { mockVocabulary } from "@/layers/data/mock/data";

export function useVocabularies() {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      if (USE_API) {
        try {
          const data = await apiGetVocabularies();
          if (!cancelled) {
            const mapped = data.map(mapApiVocabulary);
            setWords(mapped.length > 0 ? mapped : mockVocabulary);
            setFromApi(mapped.length > 0);
          }
          return;
        } catch (e) {
          if (!cancelled) {
            setError(e instanceof Error ? e.message : "API error");
          }
        }
      }

      if (!cancelled) {
        setWords(mockVocabulary);
        setFromApi(false);
      }
    }

    load().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { words, loading, fromApi, error };
}
