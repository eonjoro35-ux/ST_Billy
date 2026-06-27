export default function GalleryPage() {
  const galleryCategories = [
    { name: 'Class Activities', count: 24 },
    { name: 'Laboratories', count: 18 },
    { name: 'Sports', count: 32 },
    { name: 'School Trips', count: 16 },
    { name: 'Graduation Ceremonies', count: 12 },
    { name: 'Events', count: 28 },
  ]

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="mt-2">Explore photos and videos from our school</p>
        </div>
      </section>

      <section className="container-main">
        <h2 className="section-title mb-8">Photo Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryCategories.map((category, i) => (
            <div key={i} className="bg-gradient-to-br from-secondary to-primary text-white rounded-lg h-48 flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-lg">{category.count} photos</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-main">
        <h2 className="section-title mb-8">Recent Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-300 h-40 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
              <span>Photo {i + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
