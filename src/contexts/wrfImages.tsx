import {createContext, useCallback, useContext, useMemo, useState } from "react";
import { getWrfImages, type WrfVar } from "../services/wrf.service";

type RangeHours = 24 | 48 | 9999;

type Ctx = {
  imagesAll: string[];
  visibleImages: string[];
  rangeHours: RangeHours;
  setRangeHours: React.Dispatch<React.SetStateAction<RangeHours>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  variable: WrfVar;
  setVariable: (v: WrfVar) => void;
  loading: boolean;
  error: string | null;
  latestFolder: string | null;
  fetchWrfImages: (v?: WrfVar) => Promise<void>;
};

const WrfImagesContext = createContext<Ctx | null>(null);
const API_URL = import.meta.env.VITE_API_URL;

export function WrfImagesProvider({ children }: { children: React.ReactNode }) {
  // ✅ sem isto, não existem sets
  const [imagesAll, setImagesAll] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [variable, setVariable] = useState<WrfVar>("VENTO_10M");
  const [rangeHours, setRangeHours] = useState<RangeHours>(24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestFolder, setLatestFolder] = useState<string | null>(null);

  const fetchWrfImages = useCallback(async (v?: WrfVar) => {
    const target = v || variable;
    setLoading(true);
    setError(null);

    try {
      // ✅ chama o service
      const { list, latestFolder, serverVar } = await getWrfImages({
        apiUrl: API_URL,
        variable: target,
      });

      console.log("Fetched WRF images:", list);

      // ✅ aplica o resultado no estado do context
      setImagesAll(list);
      setLatestFolder(latestFolder);
      setCurrentIndex(0);

      localStorage.setItem(
        `wrf_${serverVar}`,
        JSON.stringify({ latestFolder, images: list, savedAt: Date.now() })
      );
    } catch (e: any) {
      setError(e?.message || String(e));
      setImagesAll([]);
      setLatestFolder(null);
      setCurrentIndex(0);
    } finally {
      setLoading(false);
    }
  }, [variable]);

  const visibleImages = useMemo(() => {
    const limit = rangeHours === 24 ? 24 : rangeHours === 48 ? 48 : imagesAll.length;
    return imagesAll.slice(0, Math.min(limit, imagesAll.length));
  }, [imagesAll, rangeHours]);

  const value = useMemo(
    () => ({
      imagesAll,
      visibleImages,
      rangeHours,
      setRangeHours,
      currentIndex,
      setCurrentIndex,
      variable,
      setVariable,
      loading,
      error,
      latestFolder,
      fetchWrfImages,
    }),
    [imagesAll, visibleImages, rangeHours, currentIndex, variable, loading, error, latestFolder, fetchWrfImages]
  );

  return <WrfImagesContext.Provider value={value}>{children}</WrfImagesContext.Provider>;
}

export function useWrfImages() {
  const ctx = useContext(WrfImagesContext);
  if (!ctx) throw new Error("useWrfImages deve ser usado dentro de WrfImagesProvider");
  return ctx;
}
