const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export function useSiteMedia() {
  const uploadSiteImage = async (file, area = 'site') => {
    if (!file || !IMAGE_TYPES.has(file.type)) {
      return { error: new Error('Выберите изображение в формате JPG, PNG, WebP или GIF.') }
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return { error: new Error('Размер изображения не должен превышать 5 МБ.') }
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const safeArea = area.replace(/[^a-z0-9-]/gi, '-').toLowerCase()
    const filename = `${safeArea}/${Date.now()}-${crypto.randomUUID()}.${extension}`
    const supabase = useSupabase()
    const { error } = await supabase.storage
      .from('site-media')
      .upload(filename, file, { cacheControl: '31536000', upsert: false, contentType: file.type })

    if (error) return { error }

    const { data } = supabase.storage.from('site-media').getPublicUrl(filename)
    return { data: { path: filename, url: data.publicUrl } }
  }

  return { uploadSiteImage }
}
