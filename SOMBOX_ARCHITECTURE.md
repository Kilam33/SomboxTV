# SomBox TV System Architecture

## 📺 **Project Overview**

SomBox TV is a smart TV platform designed specifically for elderly users, providing an intuitive interface for accessing live TV channels, movies, radio, and other entertainment content. The system is built with simplicity and accessibility in mind, using numbered remote control navigation.

## 🎯 **Core Design Principles**

### **User Experience (UX)**
- **Elderly-Friendly Interface**: Large, clear numbers and simple navigation
- **Remote Control Optimized**: Number-based channel selection (1-9)
- **Minimal Cognitive Load**: Direct access to content without complex menus
- **High Contrast**: Clear visual hierarchy for better readability
- **Responsive Design**: Optimized for TV screens and various resolutions

### **Technical Principles**
- **Microservices Architecture**: Scalable, maintainable backend services
- **Edge Computing**: CDN and caching for global performance
- **Device Authentication**: Secure Orange Pi device management
- **Real-time Updates**: Live channel status and viewer counts
- **Offline Capability**: Local caching for uninterrupted viewing

## 🏗️ **System Architecture**

### **High-Level Architecture Diagram**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Orange Pi     │    │   Orange Pi     │    │   Orange Pi     │
│   (Frontend)    │    │   (Frontend)    │    │   (Frontend)    │
│                 │    │                 │    │                 │
│  React App      │    │  React App      │    │  React App      │
│  (Local Cache)  │    │  (Local Cache)  │    │  (Local Cache)  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │     Load Balancer         │
                    │   (Cloudflare/AWS ALB)    │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   API Gateway             │
                    │   (Authentication,        │
                    │    Rate Limiting)         │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   Microservice Cluster    │
                    │   ┌─────────────────────┐ │
                    │   │  Channel Service    │ │
                    │   │  (Node.js/Express)  │ │
                    │   └─────────────────────┘ │
                    │   ┌─────────────────────┐ │
                    │   │  User Service       │ │
                    │   │  (Authentication)   │ │
                    │   └─────────────────────┘ │
                    │   ┌─────────────────────┐ │
                    │   │  Analytics Service  │ │
                    │   │  (Usage Tracking)   │ │
                    │   └─────────────────────┘ │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   Redis Cluster           │
                    │   (Caching Layer)         │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   CDN (Cloudflare)        │
                    │   ┌─────────────────────┐ │
                    │   │  Channel Logos      │ │
                    │   │  Thumbnails         │ │
                    │   │  Static Assets      │ │
                    │   └─────────────────────┘ │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   Database Cluster        │
                    │   (PostgreSQL/MongoDB)    │
                    └───────────────────────────┘
```

## 🎮 **Frontend Architecture**

### **HomePage Design**
The HomePage serves as the main navigation hub with 9 numbered channel categories:

#### **Channel Categories (1-9)**
1. **Somali TV** - Main Channel (Somali News & Cultural Programs)
2. **News** - Breaking News (Morning News & Weather Updates)
3. **Sports** - Live Sports (Football Matches & Basketball)
4. **Wildlife** - Nature & Animals (African Safari & Ocean Life)
5. **Kids TV** - Children's Shows (Cartoons & Educational Content)
6. **Movies** - Latest Films (Action Movies & Comedy Shows)
7. **Radio** - Music & Talk (Somali Music & Talk Shows)
8. **Docuseries** - Real Stories (History & Science Series)
9. **Entertainment** - Fun & Shows (Comedy & Variety Programs)

#### **Layout Structure**
- **Top Row**: 4 most used channels (1-4)
- **Bottom Row**: 5 remaining channels (5-9)
- **Responsive Design**: Optimized for TV viewing
- **Focus Navigation**: Arrow key support for remote control

### **ChannelGuide Interface**
- **Filtered View**: Shows only relevant channels for selected category
- **Preview Panel**: Right-side channel details and video preview
- **Smooth Navigation**: Keyboard and remote control support
- **Real-time Data**: Live viewer counts and current shows

### **Key Components**
```typescript
// Core interfaces
interface ChannelCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  number: number
  isLive?: boolean
  isPlaying?: boolean
  playingText?: string
  currentShow?: string
  nextShow?: string
  viewers?: string
}

interface ChannelWithDetails {
  id: string
  name: string
  category: string
  streamUrl: string
  logo: string
  views: string
  badges: string[]
  isFavorite: boolean
  description: string
}
```

## 🔧 **Backend Microservices**

### **1. Channel Service (Primary Microservice)**
**Purpose**: Manages channel data, filtering, and content delivery

#### **Key Features**
- Category-based channel filtering
- Real-time viewer count tracking
- Live channel status management
- Popular channels ranking
- Pagination support

#### **API Endpoints**
```typescript
GET /api/channels?category=somali-tv&limit=20&offset=0
GET /api/channels/live
GET /api/channels/popular
GET /api/categories
```

#### **Caching Strategy**
```typescript
// Redis cache keys
{
  "channels:category:somali-tv": { data: [...], ttl: 300 },
  "channels:popular": { data: [...], ttl: 600 },
  "channels:live": { data: [...], ttl: 60 }
}
```

### **2. Authentication Service**
**Purpose**: Device authentication and user management

#### **Features**
- Orange Pi device registration
- JWT token management
- Rate limiting per device
- Permission-based access control

#### **Device Authentication Flow**
1. Orange Pi boots and generates device ID
2. Device authenticates with backend
3. Receives JWT token for API access
4. Token refreshed automatically

### **3. Analytics Service**
**Purpose**: Usage tracking and performance monitoring

#### **Metrics Tracked**
- Channel viewership
- User engagement patterns
- System performance
- Error rates and debugging

## 🚀 **Deployment Architecture**

### **Orange Pi Frontend Deployment**
```dockerfile
# Dockerfile for Orange Pi
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```

### **Cloud Microservices Deployment**
```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: channel-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: channel-service
  template:
    metadata:
      labels:
        app: channel-service
    spec:
      containers:
      - name: channel-service
        image: sombox/channel-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## 📊 **Database Design**

### **PostgreSQL Schema**
```sql
-- Channels table
CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stream_url TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    is_live BOOLEAN DEFAULT false,
    popularity INTEGER DEFAULT 0,
    current_show VARCHAR(255),
    next_show VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channel viewers tracking
CREATE TABLE channel_viewers (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels(id),
    device_id VARCHAR(255),
    started_watching TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_watching TIMESTAMP,
    duration_seconds INTEGER
);

-- Device authentication
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(255) UNIQUE NOT NULL,
    device_info JSONB,
    is_active BOOLEAN DEFAULT true,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_channels_category_active_popular 
ON channels(category, is_active, popularity DESC);

CREATE INDEX idx_channels_live 
ON channels(id) WHERE is_live = true;

CREATE INDEX idx_channel_viewers_channel_time 
ON channel_viewers(channel_id, started_watching);
```

## 🌐 **CDN Configuration**

### **Cloudflare Setup**
```typescript
const CDN_CONFIG = {
  baseUrl: 'https://cdn.sombox.com',
  paths: {
    channelLogos: '/channels/logos',
    thumbnails: '/channels/thumbnails',
    staticAssets: '/static'
  },
  cacheHeaders: {
    'Cache-Control': 'public, max-age=86400', // 24 hours
    'CDN-Cache-Control': 'public, max-age=604800' // 7 days
  }
}

// Channel logo URL generator
export const getChannelLogoUrl = (channelId: string, size = 'medium') => {
  return `${CDN_CONFIG.baseUrl}${CDN_CONFIG.paths.channelLogos}/${channelId}-${size}.png`
}
```

## 🔒 **Security Architecture**

### **Authentication & Authorization**
- **Device-based JWT tokens**
- **Rate limiting per device**
- **API key management**
- **CORS configuration**

### **Data Protection**
- **HTTPS encryption**
- **Database encryption at rest**
- **Secure API endpoints**
- **Input validation and sanitization**

## 📈 **Performance Optimization**

### **Caching Strategy**
1. **Redis Cluster**: Application-level caching
2. **CDN**: Static asset delivery
3. **Browser Cache**: Local storage for offline access
4. **Database Query Optimization**: Indexed queries

### **Load Balancing**
- **Round-robin distribution**
- **Health checks**
- **Auto-scaling based on demand**
- **Geographic distribution**

## 🔄 **Data Flow**

### **Channel Selection Flow**
1. User selects channel number (1-9) on HomePage
2. Frontend calls API with category parameter
3. Backend filters channels by category
4. Redis cache checked first, database if needed
5. Filtered channels returned to frontend
6. ChannelGuide displays relevant channels
7. User selects specific channel
8. Video player loads content

### **Real-time Updates**
1. WebSocket connection established
2. Live viewer counts updated
3. Channel status changes broadcast
4. UI updates automatically

## 🛠️ **Development Workflow**

### **Frontend Development**
```bash
# Development setup
npm install
npm run dev

# Build for production
npm run build
npm run start
```

### **Backend Development**
```bash
# Service development
cd services/channel-service
npm install
npm run dev

# Database setup
npm run db:migrate
npm run db:seed
```

### **Testing Strategy**
- **Unit tests**: Component and service testing
- **Integration tests**: API endpoint testing
- **E2E tests**: User flow testing
- **Performance tests**: Load testing

## 📋 **Monitoring & Analytics**

### **Key Metrics**
- **Channel viewership**
- **User engagement time**
- **System performance**
- **Error rates**
- **Device health**

### **Monitoring Tools**
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **ELK Stack**: Log management
- **Sentry**: Error tracking

## 🚀 **Scaling Strategy**

### **Horizontal Scaling**
- **Microservices**: Independent scaling
- **Database**: Read replicas
- **Cache**: Redis cluster
- **CDN**: Global distribution

### **Vertical Scaling**
- **Resource allocation**: CPU/Memory optimization
- **Database optimization**: Query tuning
- **Caching**: Multi-layer caching

## 🔮 **Future Enhancements**

### **Phase 1: Core Platform**
- [x] Basic channel navigation
- [x] Category filtering
- [x] Device authentication
- [ ] Real-time updates

### **Phase 2: Advanced Features**
- [ ] Personalized recommendations
- [ ] Voice control
- [ ] Multi-language support
- [ ] Parental controls

### **Phase 3: Analytics & Insights**
- [ ] Advanced analytics dashboard
- [ ] Content performance metrics
- [ ] User behavior analysis
- [ ] A/B testing framework

## 📚 **Technical Stack**

### **Frontend**
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **SWR**: Data fetching

### **Backend**
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **PostgreSQL**: Primary database
- **Redis**: Caching layer
- **JWT**: Authentication

### **Infrastructure**
- **Docker**: Containerization
- **Kubernetes**: Orchestration
- **Cloudflare**: CDN and security
- **AWS/GCP**: Cloud hosting
- **Prometheus**: Monitoring

### **Development Tools**
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **GitHub Actions**: CI/CD

## 📞 **Support & Maintenance**

### **Documentation**
- **API Documentation**: OpenAPI/Swagger
- **User Manuals**: Device setup guides
- **Developer Guides**: Integration documentation
- **Troubleshooting**: Common issues and solutions

### **Support Channels**
- **Technical Support**: Developer assistance
- **User Support**: End-user help
- **Community Forum**: User discussions
- **Bug Reports**: Issue tracking

---

*This architecture document is a living document and will be updated as the system evolves and new requirements are identified.*
