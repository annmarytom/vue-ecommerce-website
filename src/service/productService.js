export async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products?limit=100')
  
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
  
    const data = await response.json()
  
    await new Promise((resolve) => setTimeout(resolve, 2000))
  
    return data.products.map((item) => ({
      id: item.id,
      name: item.title,
      category: item.category?.toUpperCase() || 'UNKNOWN',
      price: item.price,
      rating: item.rating,
      reviews: item.stock,
      image: item.thumbnail
    }))
  }