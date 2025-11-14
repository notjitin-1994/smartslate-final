# Pricing Page - Complete Style Guide

This document provides a framework-agnostic style guide for recreating the exact pricing page design. All values are provided in standard CSS units and can be implemented in any framework.

---

## 📋 Table of Contents

1. [Typography](#typography)
2. [Color System](#color-system)
3. [Page Structure](#page-structure)
4. [Hero Section](#hero-section)
5. [Currency Toggle](#currency-toggle)
6. [Pricing Cards](#pricing-cards)
7. [Features Section](#features-section)
8. [FAQ Section](#faq-section)
9. [Footer](#footer)
10. [Animations](#animations)

---

## 🔤 Typography

### Font Families

- **Body Font**: Lato (fallback: Arial, Helvetica, sans-serif)
- **Heading Font**: Quicksand (fallback: ui-sans-serif, system-ui, sans-serif)

### Font Weights

- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`
- Extrabold: `800`

### Font Sizes

```css
--text-display: 2rem;        /* 32px */
--text-title: 1.5rem;        /* 24px */
--text-heading: 1.25rem;     /* 20px */
--text-body: 1rem;           /* 16px */
--text-caption: 0.875rem;    /* 14px */
--text-small: 0.75rem;       /* 12px */
```

### Line Heights

```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## 🎨 Color System

### Brand Colors

```css
/* Primary Accent (Cyan/Teal) */
--primary-accent: #a7dadb;           /* rgb(167, 218, 219) */
--primary-accent-light: #d0edf0;     /* rgb(208, 237, 240) */
--primary-accent-dark: #7bc5c7;      /* rgb(123, 197, 199) */

/* Secondary Accent (Indigo) */
--secondary-accent: #4f46e5;         /* rgb(79, 70, 229) */
--secondary-accent-light: #7c69f5;   /* rgb(124, 105, 245) */
--secondary-accent-dark: #3730a3;    /* rgb(55, 48, 163) */
```

### Background Colors

```css
--background-dark: #020c1b;          /* rgb(2, 12, 27) - Main background */
--background-paper: #0d1b2a;         /* rgb(13, 27, 42) - Cards */
--background-surface: #142433;       /* rgb(20, 36, 51) - Elevated surfaces */
```

### Text Colors

```css
--text-primary: #e0e0e0;             /* rgb(224, 224, 224) - Main text */
--text-secondary: #b0c5c6;           /* rgb(176, 197, 198) - Secondary text */
--text-disabled: #7a8a8b;            /* rgb(122, 138, 139) - Disabled text */
```

### State Colors

```css
--success: #10b981;                  /* rgb(16, 185, 129) */
--warning: #f59e0b;                  /* rgb(245, 158, 11) */
--error: #ef4444;                    /* rgb(239, 68, 68) */
--info: #3b82f6;                     /* rgb(59, 130, 246) */
```

### Solara Brand (Gold)

```css
--solara-gold: #ffd700;              /* rgb(255, 215, 0) */
```

### Opacity Variants

```css
/* Primary Accent with Opacity */
rgba(167, 218, 219, 0.05)   /* 5% - Subtle background */
rgba(167, 218, 219, 0.08)   /* 8% - Border subtle */
rgba(167, 218, 219, 0.1)    /* 10% - Badge background */
rgba(167, 218, 219, 0.15)   /* 15% - Icon container */
rgba(167, 218, 219, 0.2)    /* 20% - Border medium */
rgba(167, 218, 219, 0.3)    /* 30% - Border strong */

/* Secondary Accent with Opacity */
rgba(79, 70, 229, 0.1)      /* 10% - Badge background */
rgba(79, 70, 229, 0.15)     /* 15% - Card highlight */
rgba(79, 70, 229, 0.3)      /* 30% - Border */

/* White with Opacity */
rgba(255, 255, 255, 0.02)   /* 2% - Card base */
rgba(255, 255, 255, 0.03)   /* 3% - Inner container */
rgba(255, 255, 255, 0.05)   /* 5% - Toggle background */
rgba(255, 255, 255, 0.08)   /* 8% - Border */
rgba(255, 255, 255, 0.1)    /* 10% - Border strong */
```

---

## 📐 Page Structure

### Layout Container

```css
.pricing-page {
  min-height: 100vh;
  background-color: rgb(2, 12, 27);
  color: rgb(224, 224, 224);
}

.content-container {
  max-width: 1280px;        /* 80rem / 7xl */
  margin: 0 auto;
  padding: 0 1rem;          /* 16px */
}
```

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius

```css
--radius-sm: 0.5rem;   /* 8px */
--radius-md: 0.75rem;  /* 12px */
--radius-lg: 1rem;     /* 16px */
--radius-xl: 1.5rem;   /* 24px */
--radius-2xl: 2rem;    /* 32px */
```

---

## 🎯 Hero Section

### Layout

```
Padding: 96px 16px 80px 16px (pt-24 pb-20 px-4)
Grid: 2 columns on large screens (lg:grid-cols-2)
Gap: 48px (gap-12)
Alignment: Center items (items-center)
```

### Badge (Solara Brand)

**Copy**: "Complete Learning Platform: Powered by **Solara**"

```css
.hero-badge {
  display: inline-block;
  padding: 8px 16px;
  margin-bottom: 24px;
  border-radius: 9999px;        /* fully rounded */
  border: 1px solid rgb(167, 218, 219);
  background-color: rgba(167, 218, 219, 0.1);
  font-size: 0.875rem;          /* 14px */
  font-weight: 600;
  color: rgb(167, 218, 219);
}

.hero-badge .solara-text {
  color: rgb(255, 215, 0);
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3);
}
```

### Main Headline

**Copy**: "One Platform. Every Stage of Learning. **Unlimited Potential.**"

```css
.hero-headline {
  font-family: 'Quicksand', sans-serif;
  font-size: 6rem;              /* 96px - text-6xl */
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 24px;
  color: rgb(224, 224, 224);
}

.hero-headline .highlight {
  color: rgb(167, 218, 219);
}
```

### Subheadline

**Copy**: "Flexible pricing that grows with your learning transformation"

### Hero Body Copy

**Copy**: "From ideation to impact, Solara transforms learning at every touchpoint. Choose a product. Start a revolution. Our pricing adapts to how you grow—because transforming learning shouldn't mean breaking budgets."

```css
.hero-subheadline {
  font-size: 1.125rem;          /* 18px */
  line-height: 1.75;
  margin-bottom: 24px;
  color: rgb(167, 218, 219);
  font-weight: 600;
}

.hero-body-copy {
  font-size: 1.125rem;          /* 18px */
  line-height: 1.75;
  margin-bottom: 32px;
  color: rgb(176, 197, 198);
}
```

### Hero Buttons

Two prominent CTA buttons displayed horizontally:

**Button 1**: "Explore Solara Solutions" (Primary)
**Button 2**: "Start with Polaris" (Secondary)

```css
.hero-buttons-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.hero-button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  background-color: rgb(79, 70, 229);
  color: rgb(224, 224, 224);
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-button-primary:hover {
  background-color: rgb(99, 90, 249);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
}

.hero-button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent;
  color: rgb(167, 218, 219);
  border: 1px solid rgb(167, 218, 219);
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-button-secondary:hover {
  background-color: rgba(167, 218, 219, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(167, 218, 219, 0.3);
}

.button-icon {
  width: 20px;
  height: 20px;
}
```

### Stats Cards

Three stat cards displayed horizontally with gap-6 (24px):

**Stats**:
1. **15x** - Faster Launch
2. **Zero** - Revisions
3. **100%** - Accurate

```css
.stat-container {
  display: flex;
  align-items: center;
  gap: 12px;                    /* gap-3 */
}

.stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;                  /* h-12 w-12 */
  height: 48px;
  border-radius: 8px;           /* rounded-lg */
  background-color: rgba(167, 218, 219, 0.15);
}

.stat-icon {
  width: 24px;                  /* h-6 w-6 */
  height: 24px;
  color: rgb(167, 218, 219);
}

.stat-value {
  font-size: 1.5rem;            /* text-2xl / 24px */
  font-weight: 700;
  color: rgb(167, 218, 219);
}

.stat-label {
  font-size: 0.875rem;          /* text-sm / 14px */
  color: rgb(176, 197, 198);
}
```

### Process Infographic (Right Column)

Container with border and glassmorphism effect:

```css
.process-container {
  position: relative;
  padding: 32px;                /* p-8 */
  border-radius: 16px;          /* rounded-2xl */
  border: 1px solid rgba(167, 218, 219, 0.2);
  background-color: rgba(167, 218, 219, 0.05);
}
```

**Process Steps**:

1. **01 - Requirements In** - "Upload stakeholder needs"
2. **02 - AI Analysis** - "Automated gap detection"
3. **03 - Learning Experience Design Out** - "Production-ready in 1 hour"

```css
.process-step {
  display: flex;
  align-items: start;
  gap: 16px;                    /* gap-4 */
  padding: 16px;
  border-radius: 12px;          /* rounded-xl */
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.03);
}

.process-step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: rgba(167, 218, 219, 0.15);
}

.process-step-number {
  font-size: 0.75rem;           /* text-xs */
  font-weight: 700;
  color: rgb(167, 218, 219);
}

.process-step-title {
  font-size: 0.875rem;          /* text-sm */
  font-weight: 700;
  color: rgb(224, 224, 224);
}

.process-step-description {
  font-size: 0.75rem;           /* text-xs */
  color: rgb(176, 197, 198);
}
```

Arrow icon between steps:
```css
.arrow-icon {
  width: 24px;
  height: 24px;
  color: rgb(167, 218, 219);
  margin: 0 auto;
}
```

Decorative blur elements:
```css
.decorative-blur-top {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: rgba(167, 218, 219, 0.1);
  filter: blur(48px);
}

.decorative-blur-bottom {
  position: absolute;
  bottom: -16px;
  left: -16px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-color: rgba(79, 70, 229, 0.1);
  filter: blur(48px);
}
```

---

## 💱 Currency Toggle

**Location**: Above Individual Plans section

```css
.currency-toggle-container {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.currency-toggle {
  display: inline-flex;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
}

.currency-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.currency-button.active {
  border: 1px solid rgb(167, 218, 219);
  background-color: rgba(167, 218, 219, 0.15);
  color: rgb(167, 218, 219);
}

.currency-button.inactive {
  border: none;
  background-color: transparent;
  color: rgb(176, 197, 198);
}

.currency-button.inactive:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.currency-icon {
  width: 16px;
  height: 16px;
}
```

---

## 💳 Pricing Cards

### Individual Plans

**Section Title**: "Individual Plans"
```css
.section-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 2.25rem;           /* 36px / text-4xl */
  font-weight: 700;
  margin-bottom: 48px;
  text-align: left;
  color: rgb(167, 218, 219);
}
```

**Grid Layout**:
```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;                    /* gap-8 */
}

@media (min-width: 768px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Individual Plan Tiers & Copy

#### 1. Explorer (Base Tier)

**Name**: Explorer
**Label**: "PERFECT FOR GETTING STARTED"
**Price**: $19/month (USD) or ₹1,599/month (INR)
**Starmaps**: 5 Starmaps/month
**Rollover**: Unused roll over for 12 months with 5 saved
**Savings**: "Start here before upgrading to higher tiers"

**Features**:
- 15x Faster Time-to-Launch
- 1-Hour Learning Experience Design Delivery
- Zero Revision Cycles
- 100% Requirements Captured
- Perfect Stakeholder Alignment
- Production-Ready Documentation
- Automated Gap Analysis
- Business-to-Learning Translation
- Multi-Format Export

#### 2. Navigator (Most Popular)

**Name**: Navigator
**Label**: "FOR PROFESSIONALS & CREATORS"
**Badge**: "MOST POPULAR"
**Price**: $39/month (USD) or ₹3,299/month (INR)
**Starmaps**: 25 Starmaps/month
**Rollover**: Unused roll over for 12 months with 25 saved
**Savings**: "Save $1.85 per generation (49% cheaper)"

**Features**:
- Everything in Explorer
- 5x more starmaps per month
- Priority support (24h response)

#### 3. Voyager

**Name**: Voyager
**Label**: "FOR POWER USERS & CONSULTANTS"
**Price**: $79/month (USD) or ₹6,699/month (INR)
**Starmaps**: 50 Starmaps/month
**Rollover**: Unused roll over for 12 months with 50 saved
**Savings**: "Save $2.22 per generation (58% cheaper)"

**Features**:
- Everything in Navigator
- 10x more starmaps per month
- Priority support (12h response)

### Team Plans

**Section Title**: "Team Plans"
**Subtitle**: "Team plan limits are **per user** - each team member gets the full allocation, including rollover credits."

#### 1. Crew

**Name**: Crew
**Label**: "SMALL TEAMS, BIG IMPACT"
**Price**: $24/month per user (USD) or ₹1,999/month per user (INR)
**Learning Experience Designs**: 10 Learning Experience Designs per user/month
**Rollover**: Unused roll over for 12 months with 10 saved per user

**Features**:
- 15x Faster Time-to-Launch
- 1-Hour Learning Experience Design Delivery
- Zero Revision Cycles
- 100% Requirements Captured
- Perfect Stakeholder Alignment
- Production-Ready Documentation
- Automated Gap Analysis
- Business-to-Learning Translation
- Multi-Format Export

#### 2. Fleet (Popular)

**Name**: Fleet
**Label**: "SCALE YOUR OPERATIONS"
**Badge**: "POPULAR CHOICE"
**Price**: $64/month per user (USD) or ₹5,399/month per user (INR)
**Learning Experience Designs**: 30 Learning Experience Designs per user/month
**Rollover**: Unused roll over for 12 months with 30 saved per user

**Features**:
- Everything in Crew
- 3x more learning experience designs per user
- Priority support (24h response)

#### 3. Armada

**Name**: Armada
**Label**: "DEPARTMENT & ORGANIZATION SCALE"
**Price**: $129/month per user (USD) or ₹10,899/month per user (INR)
**Learning Experience Designs**: 60 Learning Experience Designs per user/month
**Rollover**: Unused roll over for 12 months with 60 saved per user

**Features**:
- Everything in Fleet
- 6x more learning experience designs per user
- Priority support (12h response)

### Card Styling

```css
.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;               /* p-8 */
  border-radius: 16px;         /* rounded-2xl */
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Standard Card */
.pricing-card.standard {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(255, 255, 255, 0.02);
}

/* Popular Card */
.pricing-card.popular {
  border: 1px solid rgba(79, 70, 229, 0.3);
  background-color: rgba(79, 70, 229, 0.15);
}

/* Hover State */
.pricing-card:hover {
  transform: translateY(-8px);
  transition: transform 0.3s ease;
}
```

### Badge

```css
.pricing-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 9999px;
  background-color: rgb(167, 218, 219);
  font-size: 0.75rem;          /* text-xs */
  font-weight: 800;
  text-transform: uppercase;
  color: rgb(2, 12, 27);
}
```

### Plan Name and Label

```css
.plan-name {
  font-size: 1.5rem;           /* text-2xl / 24px */
  font-weight: 700;
  margin-bottom: 8px;
  color: rgb(224, 224, 224);
}

.plan-label {
  font-size: 0.875rem;         /* text-sm / 14px */
  font-weight: 600;
  color: rgb(176, 197, 198);
}
```

### Price Display

```css
.price-container {
  margin-bottom: 24px;
}

.price {
  font-size: 2.25rem;          /* text-4xl / 36px */
  font-weight: 700;
  color: rgb(167, 218, 219);
}

.price-period {
  font-size: 1.125rem;         /* text-lg / 18px */
  color: rgb(176, 197, 198);
}
```

### Allocation Box

```css
.allocation-box {
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.03);
}

.allocation-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: rgb(224, 224, 224);
}

.allocation-subtitle {
  font-size: 0.75rem;
  color: rgb(176, 197, 198);
}
```

### Savings Text

```css
.savings-text {
  font-size: 0.875rem;
  margin-bottom: 24px;
  color: rgb(167, 218, 219);
}
```

### CTA Buttons

```css
/* Individual Plan Button */
.cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  margin-bottom: 32px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button.primary {
  background-color: rgb(79, 70, 229);
  color: rgb(224, 224, 224);
  border: none;
}

.cta-button.primary:hover {
  opacity: 0.9;
}

/* Team Plan Button (Outline) */
.cta-button.outline {
  background-color: transparent;
  color: rgb(79, 70, 229);
  border: 1px solid rgb(79, 70, 229);
}

.cta-button.outline:hover {
  background-color: rgba(79, 70, 229, 0.1);
}

.cta-icon {
  width: 16px;
  height: 16px;
}
```

### Features List

```css
.features-list {
  margin-top: auto;             /* Push to bottom of card */
  list-style: none;
  padding: 0;
}

.feature-item {
  display: flex;
  align-items: start;
  gap: 12px;
  margin-bottom: 16px;
}

.feature-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
  color: rgb(167, 218, 219);
}

.feature-text {
  font-size: 0.875rem;
  color: rgb(224, 224, 224);
}
```

---

## ✨ Features Section

**Section Title**: "Every Plan Includes"
**Subtitle**: "Core features that power your learning experience design generation"

**Layout**:
```css
.features-section {
  padding: 64px 16px;          /* py-16 px-4 */
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Feature Cards

**9 Feature Items**:

1. **15x Faster Time-to-Launch** - "Cut weeks of planning down to hours. Launch learning programs at unprecedented speed"
2. **1-Hour Learning Experience Design Delivery** - "Complete, production-ready learning experience designs generated in under 60 minutes"
3. **Zero Revision Cycles** - "First draft is final. AI-powered accuracy eliminates endless back-and-forth revisions"
4. **100% Requirements Captured** - "Nothing falls through the cracks. Every stakeholder need documented and addressed"
5. **Perfect Stakeholder Alignment** - "Get buy-in faster with learning experience designs that speak to every stakeholder perspective"
6. **Production-Ready Documentation** - "Polished, professional learning experience designs ready to present to leadership on day one"
7. **Automated Gap Analysis** - "AI identifies missing requirements and potential issues before they become problems"
8. **Business-to-Learning Translation** - "Transforms business objectives into actionable learning outcomes automatically"
9. **Multi-Format Export** - "Download learning experience designs in PDF, Word, or JSON. Share instantly with any stakeholder"

```css
.feature-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(167, 218, 219, 0.1);
  background-color: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(167, 218, 219, 0.3);
  background-color: rgba(167, 218, 219, 0.05);
}

.feature-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: rgba(167, 218, 219, 0.15);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-container {
  transform: scale(1.1);
  background-color: rgba(167, 218, 219, 0.25);
}

.feature-icon {
  width: 24px;
  height: 24px;
  color: rgb(167, 218, 219);
}

.feature-title {
  font-size: 1.125rem;         /* text-lg / 18px */
  font-weight: 700;
  margin-bottom: 8px;
  color: rgb(224, 224, 224);
}

.feature-description {
  font-size: 0.875rem;         /* text-sm / 14px */
  line-height: 1.75;
  color: rgb(176, 197, 198);
}
```

---

## ❓ FAQ Section

**Section Title**: "Frequently Asked Questions"
**Subtitle**: "Everything you need to know about our plans and pricing"

### Category Filters

**Categories**:
- 🌟 All Questions
- 💳 Billing
- ✨ Features
- 🛟 Support

```css
.faq-section {
  padding: 64px 16px;
}

.faq-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
}

.filter-button {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.filter-button.active {
  background-color: rgba(79, 70, 229, 0.1);
  color: rgb(79, 70, 229);
  border: 1px solid rgba(79, 70, 229, 0.3);
}

.filter-button.inactive {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgb(176, 197, 198);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-button.inactive:hover {
  color: rgb(224, 224, 224);
  border-color: rgba(79, 70, 229, 0.2);
}
```

### FAQ Items

**8 Questions**:

1. **Do my unused Starmaps expire?**
   - *Answer*: Never, as long as you maintain an active subscription. Your saved Starmaps accumulate month over month, building a permanent library. Think of it like a gym membership where you actually get to keep the muscle you've built. Your monthly generations refresh on the 1st of each month, and any Starmaps you save remain in your library indefinitely.

2. **What's the difference between "generations" and "saved Starmaps"?**
   - *Answer*: Generations are your monthly creation limit — how many new AI-powered learning experience designs you can create each month. Saved Starmaps is your storage library — how many you can keep and access anytime. For example, Navigator gives you 25 new generations each month, and you can save up to 25 Starmaps in your library that roll over and accumulate.

3. **What happens if I upgrade or downgrade my plan?**
   - *Answer*: When you upgrade, your saved Starmaps remain, and you start receiving your new, higher monthly allocation immediately. When you downgrade, you keep all saved Starmaps — you just receive fewer new generations each month going forward. Your library is always yours.

4. **Is there a maximum number of Starmaps I can save?**
   - *Answer*: Yes, to ensure system performance: Explorer can save up to 5 Starmaps (60 with rollover over 12 months), Navigator up to 25 Starmaps (300 with 12-month accumulation), and Voyager up to 50 saved Starmaps (600 with 12-month accumulation). Team plans have shared pools: Crew (10/user), Fleet (30/user), Armada (60/user).

5. **What happens if I cancel my subscription?**
   - *Answer*: If you cancel, you'll have 30 days to download or use your saved Starmaps. We'll send you reminders before your access expires. Simply reactivate before the 30-day window closes to retain your full library. We want you to keep what you've built.

6. **Is there a free trial available?**
   - *Answer*: Yes! All plans come with a 14-day free trial with 3 Starmap generations included. No credit card required to start. If you subscribe after your trial, those 3 Starmaps roll over into your library — they don't disappear!

7. **How does team collaboration work?**
   - *Answer*: Team plans include shared workspaces where members can collaborate in real-time. You can set role-based permissions, share templates, and work together on Starmaps. The team shares a collective pool of monthly generations and saved Starmaps that grows each month.

8. **Can I export my Starmaps?**
   - *Answer*: All plans include export to PDF. Navigator and above can export to Word and PDF formats with advanced formatting. We're also working on API access for Voyager users to integrate with other tools in your workflow.

```css
.faq-container {
  max-width: 768px;            /* 3xl */
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-item.open {
  border-color: rgba(79, 70, 229, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.faq-item:hover {
  border-color: rgba(79, 70, 229, 0.1);
}

.faq-question-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  padding: 16px 24px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.faq-question-button:hover {
  background-color: rgba(224, 224, 224, 0.05);
}

.faq-question {
  font-weight: 500;
  color: rgb(224, 224, 224);
}

.faq-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.faq-icon.collapsed {
  color: rgb(122, 138, 139);
  transform: rotate(0deg);
}

.faq-icon.expanded {
  color: rgb(79, 70, 229);
  transform: rotate(180deg);
}

.faq-answer-container {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.faq-answer {
  padding: 16px 24px;
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgb(176, 197, 198);
}
```

### Support CTA

**Copy**: "Still have questions? We're here to help"

```css
.support-cta {
  margin-top: 64px;
  text-align: center;
}

.support-text {
  font-size: 0.875rem;
  margin-bottom: 24px;
  color: rgb(176, 197, 198);
}

.support-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.05);
  color: rgb(224, 224, 224);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.support-button:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(79, 70, 229, 0.3);
}

.support-icon {
  width: 16px;
  height: 16px;
}
```

---

## 🦶 Footer

### Layout

```css
.footer {
  position: relative;
  margin-top: auto;
  padding: 48px 16px 64px 16px;  /* py-12 px-4 lg:py-16 */
  border-top: 1px solid rgba(79, 70, 229, 0.2);
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

### Footer Sections

#### Company Info (Column 1)

**Logo**: Smartslate logo (378x95px)
**Tagline**: "Revolutionizing the way the world learns through innovative educational technology."

```css
.footer-logo-container {
  margin-bottom: 24px;
}

.footer-logo {
  transition: opacity 0.2s ease;
}

.footer-logo:hover {
  opacity: 0.9;
}

.footer-tagline {
  font-size: 0.875rem;
  line-height: 1.75;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.6);
}
```

#### Products (Column 2)

**Heading**: "PRODUCTS"

Links:
- Solara: Features (https://www.smartslate.io/features)
- Solara: Pricing (https://www.smartslate.io/pricing)

#### Services (Column 3)

**Heading**: "SERVICES"

Links:
- Ignite (https://www.smartslate.io/ignite)
- Strategic Skills Architecture (https://www.smartslate.io/products)

#### Company (Column 4)

**Heading**: "COMPANY"

Links:
- About Us (https://www.smartslate.io/difference)
- Careers (https://www.smartslate.io/careers)
- Contact (https://www.smartslate.io/contact)
- Partners (https://www.smartslate.io/partner)

#### Legal (Column 5)

**Heading**: "LEGAL"

Links:
- Privacy Policy (https://www.smartslate.io/legal/privacy)
- Terms of Service (https://www.smartslate.io/legal/terms)
- Cookie Policy (https://www.smartslate.io/cookies)

### Footer Styling

```css
.footer-heading {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(255, 255, 255);
}

.footer-link {
  display: block;
  padding: 4px 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgb(79, 70, 229);
}
```

### Footer Bottom

```css
.footer-bottom {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(79, 70, 229, 0.2);
}

.footer-bottom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

@media (min-width: 640px) {
  .footer-bottom-container {
    flex-direction: row;
  }
}

.footer-copyright {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-made-with {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-heart-icon {
  width: 16px;
  height: 16px;
  color: rgb(239, 68, 68);
  fill: currentColor;
}
```

---

## 🎬 Animations

### Framer Motion Values

```css
/* Animation Durations */
--duration-fast: 200ms;
--duration-base: 300ms;
--duration-slow: 500ms;

/* Animation Easing */
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Fade In Animation

```javascript
// initial
{ opacity: 0, y: 20 }

// animate
{ opacity: 1, y: 0 }

// transition
{
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94]
}
```

### Card Hover Animation

```javascript
// whileHover
{
  y: -8,                        // Move up 8px
  transition: { duration: 0.3 }
}
```

### Feature Card Hover

```javascript
// whileHover
{
  y: -4,                        // Move up 4px
  transition: { duration: 0.2 }
}
```

### Staggered Children Animation

```javascript
// Container
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    staggerChildren: 0.08      // 80ms between each child
  }
}

// Child items
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: index * 0.08 }
}
```

### Pure CSS Keyframes

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Transition Classes

```css
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Extra Small (default) */
/* 0px and up - Mobile portrait */

/* Small */
@media (min-width: 640px) {
  /* Mobile landscape / Small tablets */
}

/* Medium */
@media (min-width: 768px) {
  /* Tablets */
}

/* Large */
@media (min-width: 1024px) {
  /* Desktop */
}

/* Extra Large */
@media (min-width: 1280px) {
  /* Large desktop */
}

/* 2X Large */
@media (min-width: 1536px) {
  /* Extra large desktop */
}
```

---

## 🎨 Shadows & Effects

### Box Shadows

```css
/* Subtle shadow */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12),
             0 1px 2px rgba(0, 0, 0, 0.24);

/* Medium shadow */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1),
             0 2px 4px rgba(0, 0, 0, 0.06);

/* Large shadow */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1),
             0 4px 6px rgba(0, 0, 0, 0.05);

/* Extra large shadow */
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15),
             0 10px 10px rgba(0, 0, 0, 0.04);

/* 2X large shadow */
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
```

### Glow Effects

```css
/* Primary glow */
--glow-primary: 0 0 20px rgba(167, 218, 219, 0.3);

/* Secondary glow */
--glow-secondary: 0 0 20px rgba(79, 70, 229, 0.3);

/* Subtle glow */
--glow-subtle: 0 0 10px rgba(167, 218, 219, 0.15);

/* Gold glow for Solara */
.solara-glow {
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3);
}
```

### Backdrop Blur

```css
.backdrop-blur {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.backdrop-blur-strong {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .backdrop-blur {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}
```

---

## 🔧 Utility Classes

### Loading Spinner

```css
.loading-spinner {
  width: 32px;
  height: 32px;
  border: 4px solid rgb(167, 218, 219);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Empty State

```css
.empty-state {
  padding: 32px;
  border-radius: 8px;
  border: 1px solid rgba(167, 218, 219, 0.2);
  background-color: rgba(167, 218, 219, 0.05);
  text-align: center;
}

.empty-state-text {
  font-size: 1.125rem;
  color: rgb(176, 197, 198);
}

.empty-state-subtext {
  margin-top: 8px;
  font-size: 0.875rem;
  color: rgb(176, 197, 198);
}
```

---

## 📊 Component States

### Disabled State

```css
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Loading State

```css
.loading {
  position: relative;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(2, 12, 27, 0.5);
  backdrop-filter: blur(2px);
}
```

### Success/Error States

```css
.success-border {
  border-color: rgb(16, 185, 129);
}

.error-border {
  border-color: rgb(239, 68, 68);
}

.success-text {
  color: rgb(16, 185, 129);
}

.error-text {
  color: rgb(239, 68, 68);
}
```

---

## 🎯 Accessibility

### Focus States

```css
*:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px rgb(2, 12, 27),
    0 0 0 4px rgb(79, 70, 229);
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 🚀 Performance Tips

1. **Reduce motion on mobile**: All animations are reduced on touch devices for better performance
2. **Optimize backdrop-filter**: Disabled on iOS devices to prevent hanging
3. **Lazy load images**: Use loading="lazy" attribute
4. **Minimize re-renders**: Use React.memo for expensive components
5. **Debounce currency changes**: Wait for user to finish selecting before updating

---

## 📄 Document Version

**Version**: 1.2
**Last Updated**: 2025-10-28
**Framework**: Framework-agnostic
**Compatible With**: React, Vue, Angular, Svelte, HTML/CSS
**Updates**: Reworked hero section with platform-wide messaging, new headline "One Platform. Every Stage of Learning. Unlimited Potential.", added compelling subheadline and body copy emphasizing flexible pricing, added dual CTA buttons "Explore Solara Solutions" and "Start with Polaris"

---

## 📞 Questions?

For implementation questions or clarifications, contact the development team at support@smartslate.io
