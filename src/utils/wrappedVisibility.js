// useWrappedVisibility.js
import { useMemo } from "react";

/**
 * Menentukan kapan Wrapped card harus muncul di dashboard.
 *
 * Rules default:
 * - Muncul di 3 hari pertama setiap bulan baru
 * - Hilang setelah user dismiss (disimpan di localStorage per bulan)
 */
export function useWrappedVisibility({ showDays = 31 } = {}) {
  return useMemo(() => {
    const now      = new Date();
    const day      = now.getDate();
    const month    = now.getMonth();       // 0-indexed (0 = Jan)
    const year     = now.getFullYear();

    const isWithinWindow = day <= showDays;

    // Data bulan lalu (yang di-recap)
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear  = month === 0 ? year - 1 : year;

    // Label bulan untuk display
    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    const monthLabel = `${monthNames[prevMonth]} ${prevYear}`;

    return {
      isVisible: isWithinWindow,
      prevMonth,
      prevYear,
      monthLabel,
    };
  }, [showDays]);
}
