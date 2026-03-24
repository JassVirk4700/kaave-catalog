export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans">
      <main className="grow w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header Skeleton */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 border-b border-[#eae6df] pb-6">
          <div className="space-y-2">
            <div className="h-8 w-56 bg-[#eae6df] animate-pulse rounded-lg" />
            <div className="h-4 w-72 bg-[#eae6df]/60 animate-pulse rounded-md" />
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-44 bg-[#eae6df] animate-pulse rounded-full" />
            <div className="h-8 w-32 bg-[#eae6df]/70 animate-pulse rounded-lg" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-[#eae6df] shadow-sm rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#f5f3f0] border-b border-[#eae6df] px-6 py-4 flex gap-8">
            {["w-12", "w-32", "w-24", "w-20", "w-16", "w-16", "w-16"].map((w, i) => (
              <div key={i} className={`h-3 ${w} bg-[#eae6df] animate-pulse rounded`} />
            ))}
          </div>

          {/* Animated Row Skeleton × 5 */}
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="flex items-center gap-8 px-6 py-5 border-b border-[#eae6df] last:border-0"
              style={{ animationDelay: `${rowIdx * 80}ms` }}
            >
              {/* Circle thumbnail */}
              <div className="w-11 h-11 rounded-full bg-[#eae6df] animate-pulse shrink-0" />
              {/* Name */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-3.5 w-36 bg-[#eae6df] animate-pulse rounded" />
              </div>
              {/* Category badge placeholder */}
              <div className="h-6 w-24 bg-[#eae6df] animate-pulse rounded-md" />
              {/* Subcategory */}
              <div className="h-3 w-20 bg-[#eae6df]/60 animate-pulse rounded" />
              {/* Status badge */}
              <div className="h-6 w-20 bg-[#eae6df] animate-pulse rounded-md" />
              {/* Images count */}
              <div className="h-5 w-12 bg-[#eae6df]/60 animate-pulse rounded" />
              {/* Actions */}
              <div className="h-3 w-12 bg-[#eae6df]/60 animate-pulse rounded ml-auto" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
