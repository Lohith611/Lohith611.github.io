<template>
  <div class="blogs-page">
    <div class="page-container">
      <h1 class="page-title">My Blogs</h1>

      <div v-if="loading" class="loading-state">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="error-state">
        <div class="error-card">
          <h3>Oops! Failed to load blogs</h3>
          <p>{{ error }}</p>
          <button @click="fetchBlogs" class="retry-btn">Retry</button>
          <a href="https://medium.com/@itslohith116" target="_blank" class="visit-medium-btn">Visit Medium Profile</a>
        </div>
      </div>

      <div v-else-if="blogs.length === 0" class="empty-state">
        <div class="empty-card">
          <h3>No blogs found</h3>
          <p>Check back later for new content!</p>
          <a href="https://medium.com/@itslohith116" target="_blank" class="visit-medium-btn">Visit Medium Profile</a>
        </div>
      </div>

      <div v-else class="blogs-grid">
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="blog-card"
          @click="openBlog(blog)"
        >
          <div class="blog-image">
            <img v-if="blog.thumbnail" :src="blog.thumbnail" :alt="blog.title" class="thumbnail" />
            <div v-else class="image-placeholder">
              <span class="placeholder-text">MEDIUM</span>
            </div>
          </div>

          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-date">{{ blog.date }}</span>
              <span v-if="blog.readTime" class="blog-read-time">{{ blog.readTime }} min read</span>
            </div>

            <h2 class="blog-title">{{ blog.title }}</h2>
            <p class="blog-excerpt">{{ blog.excerpt }}</p>

            <div class="blog-tags">
              <span v-for="tag in blog.tags" :key="tag" class="blog-tag">
                {{ tag }}
              </span>
            </div>

            <button class="read-more-btn">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>

    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollToTop from '../components/ScrollToTop.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

interface Blog {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: number | null
  tags: string[]
  link: string
  thumbnail: string
}

const blogs = ref<Blog[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const MEDIUM_RSS_URL = 'https://medium.com/feed/@itslohith116'
const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`

async function fetchBlogs() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(RSS2JSON_API)
    if (!response.ok) throw new Error('Failed to fetch from RSS service')
    
    const data = await response.json()
    
    if (data.status === 'ok') {
      blogs.value = data.items.map((item: any) => {
        // Extract excerpt from description (strip HTML)
        const div = document.createElement('div')
        div.innerHTML = item.description
        const text = div.textContent || div.innerText || ''
        const excerpt = text.length > 150 ? text.substring(0, 150) + '...' : text

        // Format date
        const dateObj = new Date(item.pubDate)
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        })

        return {
          id: item.guid,
          title: item.title,
          excerpt: excerpt,
          date: formattedDate,
          readTime: null, // RSS doesn't always provide this
          tags: item.categories || [],
          link: item.link,
          thumbnail: item.thumbnail
        }
      })
    } else {
      throw new Error(data.message || 'Error parsing RSS feed')
    }
  } catch (err: any) {
    console.error('Error fetching blogs:', err)
    error.value = err.message || 'Could not load blogs. Please try again later.'
  } finally {
    loading.value = false
  }
}

function openBlog(blog: Blog) {
  window.open(blog.link, '_blank')
}

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped lang="scss">
.blogs-page {
  position: relative;
  z-index: 1;
  padding: 60px;
  min-height: calc(100vh - 200px);
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0 0 60px 0;
  text-align: center;
  text-shadow: 4px 4px 0 #FFD700;
}

.loading-state, .error-state, .empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-card, .empty-card {
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 12px 12px 0 #000;
  max-width: 500px;

  h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 25px;
    color: #666;
  }
}

.retry-btn, .visit-medium-btn {
  display: inline-block;
  padding: 12px 24px;
  font-weight: 700;
  border: 3px solid #000;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  text-decoration: none;
  transition: all 0.2s;
}

.retry-btn {
  background: #FFD700;
  color: #000;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 0 #000;
  }
}

.visit-medium-btn {
  background: #000;
  color: #fff;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 5px 5px 0 #4A90E2;
  }
}

.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
}

.blog-card {
  background: white;
  border: 4px solid #000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 8px 8px 0 #000;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
  }
}

.blog-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #FFE88C 0%, #FFD700 100%);
  border-bottom: 4px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-placeholder {
    .placeholder-text {
      font-size: 40px;
      font-weight: 900;
      color: rgba(0,0,0,0.1);
      letter-spacing: 5px;
    }
  }
}

.blog-content {
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  .blog-date {
    font-size: 13px;
    font-weight: 700;
    color: #4A90E2;
  }

  .blog-read-time {
    font-size: 13px;
    font-weight: 600;
    color: #666;
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 8px;
    border: 2px solid #000;
  }
}

.blog-title {
  font-size: 24px;
  font-weight: 800;
  color: #000;
  margin: 0 0 15px 0;
  line-height: 1.3;
}

.blog-excerpt {
  font-size: 15px;
  line-height: 1.7;
  color: #333;
  margin: 0 0 20px 0;
  flex: 1;
}

.blog-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.blog-tag {
  padding: 6px 12px;
  background: #FFE88C;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
}

.read-more-btn {
  width: 100%;
  padding: 14px;
  background: #4A90E2;
  border: 4px solid #000;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .blogs-page {
    padding: 40px 20px;
  }

  .blogs-grid {
    grid-template-columns: 1fr;
  }
}
</style>