# GitHub Issues Creation Guide

Go to: https://github.com/Eshaan-byte/Carbon-Tracker/issues/new

## Issue 1: Add Music Streaming Activity Type
**Title:** Add Music Streaming Activity Type
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add a new activity type for music streaming (Spotify, Apple Music, etc.)

## Tasks
- [ ] Add `music_streaming` to activity types in `src/types/index.ts`
- [ ] Add CO2 factor (8g per hour) in `src/constants/co2Factors.ts`
- [ ] Add form field in `src/components/forms/ActivityForm.tsx`
- [ ] Add icon and styling

## Acceptance Criteria
- Music streaming appears as a new activity option
- CO2 calculations work correctly
- Form UI is consistent with existing fields
- Changes are properly typed

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 2: Create Dark Mode Toggle
**Title:** Create Dark Mode Toggle
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Implement a dark/light theme toggle for better accessibility

## Tasks
- [ ] Add theme context in `src/contexts/ThemeContext.tsx`
- [ ] Create toggle button component
- [ ] Update CSS variables for dark theme
- [ ] Persist theme preference in localStorage

## Acceptance Criteria
- Toggle switches between light and dark themes
- Theme preference persists across sessions
- All components work in both themes
- Smooth transition animations

**Difficulty:** Beginner
**Estimated Time:** 3-4 hours
```

## Issue 3: Add Keyboard Shortcuts
**Title:** Add Keyboard Shortcuts for Navigation
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add keyboard navigation for better accessibility

## Shortcuts to Implement
- `Ctrl+1` → Dashboard
- `Ctrl+2` → Activities  
- `Ctrl+3` → Tips
- `Ctrl+4` → Goals
- `Ctrl+5` → Badges

## Tasks
- [ ] Implement keyboard event listeners
- [ ] Create navigation shortcuts
- [ ] Add help modal showing shortcuts
- [ ] Test cross-browser compatibility

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 4: Implement Activity Deletion
**Title:** Implement Activity Deletion Feature
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Allow users to delete recent activity entries

## Tasks
- [ ] Add delete button to activity history items
- [ ] Implement confirmation dialog
- [ ] Update dashboard data when activity is deleted
- [ ] Show success/error messages
- [ ] Update database operations

## Acceptance Criteria
- Delete button appears on activity items
- Confirmation prevents accidental deletion
- Dashboard updates immediately
- Proper error handling

**Difficulty:** Beginner
**Estimated Time:** 3-4 hours
```

## Issue 5: Create Loading Skeletons
**Title:** Create Loading Skeletons for Better UX
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Replace loading spinners with skeleton screens for better UX

## Tasks
- [ ] Create skeleton components for dashboard cards
- [ ] Add skeleton for chart loading states
- [ ] Implement skeleton for activity form
- [ ] Match skeleton structure to actual content
- [ ] Add smooth loading animations

## Acceptance Criteria
- Skeletons match final content structure
- Smooth transitions to real content
- Consistent design across components
- Improved perceived performance

**Difficulty:** Beginner
**Estimated Time:** 3-4 hours
```

## Issue 6: Add More Eco-Friendly Tips
**Title:** Add 20 New Eco-Friendly Tips
**Labels:** good first issue, content, hacktoberfest
**Description:**
```
Expand the tips database with 20 new actionable tips

## Tasks
- [ ] Research and add new tips to `src/constants/tips.ts`
- [ ] Include potential CO2 savings for each tip
- [ ] Add appropriate icons/emojis
- [ ] Categorize by activity type
- [ ] Include sources/references where applicable

## Content Areas
- Digital wellness tips
- Energy-saving techniques
- Sustainable tech practices
- Green computing habits

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 7: Implement Data Export to CSV
**Title:** Implement Data Export to CSV
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Allow users to export their carbon footprint data

## Tasks
- [ ] Create export button in dashboard
- [ ] Generate CSV with activity history
- [ ] Include date, activity type, CO2 amount columns
- [ ] Add download functionality
- [ ] Show export success/error messages

## Acceptance Criteria
- CSV contains all user data
- Proper formatting and headers
- File downloads correctly
- User feedback on export status

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 8: Add More Badge Types
**Title:** Create 10 New Achievement Badges
**Labels:** good first issue, gamification, hacktoberfest
**Description:**
```
Create 10 new achievement badges for user engagement

## Tasks
- [ ] Design new badge criteria in `src/constants/badges.ts`
- [ ] Add creative badge names and descriptions
- [ ] Include appropriate emojis/icons
- [ ] Add various difficulty levels (easy/medium/hard)
- [ ] Update badge evaluation logic

## Badge Ideas
- Streak achievements
- Activity-specific milestones
- Reduction percentage goals
- Consistency rewards

**Difficulty:** Beginner
**Estimated Time:** 3-4 hours
```

## Issue 9: Create Comparison Charts
**Title:** Add Global Average Comparison Charts
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add charts comparing user's footprint to global averages

## Tasks
- [ ] Add global average data constants
- [ ] Create comparison bar chart component
- [ ] Show user vs average vs target comparisons
- [ ] Add different comparison periods (daily/weekly/monthly)
- [ ] Include explanatory text and context

## Acceptance Criteria
- Clear visual comparisons
- Accurate global average data
- Multiple time period views
- Educational context provided

**Difficulty:** Beginner
**Estimated Time:** 4-5 hours
```

## Issue 10: Implement Activity Quick Actions
**Title:** Add Quick Action Buttons for Common Activities
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add quick action buttons for common activities

## Tasks
- [ ] Create floating action button
- [ ] Add quick shortcuts for common activities
- [ ] One-click to add "1 hour streaming", "10 emails", etc.
- [ ] Show confirmation toast messages
- [ ] Update dashboard immediately

## Common Activities
- "1 hour streaming"
- "10 emails sent"
- "2 hours coding"
- "1 hour video call"

**Difficulty:** Beginner
**Estimated Time:** 3-4 hours
```

## Issue 11: Build Monthly Report Generator
**Title:** Build Monthly PDF Report Generator
**Labels:** enhancement, hacktoberfest
**Description:**
```
Generate detailed monthly PDF reports

## Tasks
- [ ] Integrate PDF generation library (jsPDF or similar)
- [ ] Create report template with charts
- [ ] Include monthly statistics and trends
- [ ] Add email delivery option
- [ ] Make reports shareable

## Report Contents
- Monthly carbon footprint summary
- Activity breakdown charts
- Trend analysis
- Goal progress
- Recommendations

**Difficulty:** Intermediate
**Estimated Time:** 6-8 hours
```

## Issue 12: Create Carbon Offset Calculator
**Title:** Create Carbon Offset Calculator
**Labels:** enhancement, hacktoberfest
**Description:**
```
Calculate and suggest carbon offset options

## Tasks
- [ ] Research offset calculation methods
- [ ] Integrate with offset provider APIs
- [ ] Show cost and impact of offsets
- [ ] Create offset tracking system
- [ ] Add offset purchase flow (mock or real)

## Features
- Offset cost calculation
- Different offset project types
- Impact visualization
- Purchase tracking

**Difficulty:** Intermediate
**Estimated Time:** 8-10 hours
```

## Issue 13: Real-time Collaboration Features
**Title:** Add Real-time Collaboration Features
**Labels:** enhancement, hacktoberfest
**Description:**
```
Allow families/teams to track carbon footprint together

## Tasks
- [ ] Implement real-time updates with WebSockets
- [ ] Create team/family group management
- [ ] Add shared dashboards and goals
- [ ] Implement team challenges
- [ ] Add real-time notifications

## Advanced Features
- Group creation and management
- Shared goal setting
- Team leaderboards
- Real-time activity feeds

**Difficulty:** Advanced
**Estimated Time:** 15-20 hours
```

## Issue 14: Mobile App with React Native
**Title:** Create React Native Mobile App
**Labels:** enhancement, hacktoberfest
**Description:**
```
Create companion mobile app

## Tasks
- [ ] Set up React Native project
- [ ] Share components with web app
- [ ] Add mobile-specific features (camera, GPS)
- [ ] Implement push notifications
- [ ] Add offline data sync

## Mobile Features
- Native navigation
- Push notifications
- Offline capability
- Camera integration
- Location services

**Difficulty:** Advanced
**Estimated Time:** 20-30 hours
```

## Issue 15: AI-Powered Recommendations
**Title:** Add AI-Powered Personalized Recommendations
**Labels:** enhancement, ai, hacktoberfest
**Description:**
```
Use machine learning to provide personalized recommendations

## Tasks
- [ ] Integrate AI/ML service (OpenAI, Hugging Face, etc.)
- [ ] Analyze user activity patterns
- [ ] Generate personalized tips and insights
- [ ] Predict future carbon footprint trends
- [ ] A/B test recommendation effectiveness

## AI Features
- Pattern recognition
- Personalized tip generation
- Predictive analytics
- Smart goal suggestions

**Difficulty:** Advanced
**Estimated Time:** 15-25 hours
```

## Issue 16: Add Toast Notification Component
**Title:** Create Reusable Toast Notification System
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Build a reusable toast notification component for user feedback

## Tasks
- [ ] Create `src/components/ui/Toast.tsx` component
- [ ] Add toast context for global state management
- [ ] Implement success, error, warning, and info variants
- [ ] Add auto-dismiss functionality (default 3 seconds)
- [ ] Create custom hook `useToast()` for easy usage
- [ ] Add slide-in animation from top-right

## Acceptance Criteria
- Toast appears when triggered
- Multiple toasts stack properly
- Auto-dismiss works correctly
- Different variants have appropriate colors
- Accessible with ARIA labels

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 17: Add Gaming Activity Type
**Title:** Add Gaming/Streaming Activity Carbon Tracking
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add gaming and game streaming as trackable activities

## Tasks
- [ ] Add `gaming` and `game_streaming` to activity types in `src/types/index.ts`
- [ ] Add CO2 factors: gaming (30g/hour), game streaming (55g/hour) in `src/constants/co2Factors.ts`
- [ ] Add gaming icon (🎮) to activity form
- [ ] Update form to show both activities
- [ ] Add helpful tooltips explaining CO2 impact

## Acceptance Criteria
- Gaming activities appear in dropdown
- Calculations are accurate
- Icons display properly
- TypeScript types are correct

**Difficulty:** Beginner
**Estimated Time:** 1-2 hours
```

## Issue 18: Add Footer Component
**Title:** Create Footer with Links and Credits
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add a professional footer to the application

## Tasks
- [ ] Create `src/components/layout/Footer.tsx`
- [ ] Add links: About, Privacy Policy, Terms of Service, GitHub
- [ ] Include Hacktoberfest 2025 badge
- [ ] Add "Made with ❤️ for the planet" message
- [ ] Make it responsive (mobile/desktop)
- [ ] Add social media links (optional)

## Acceptance Criteria
- Footer appears on all pages
- Links are working (can be placeholders)
- Responsive design
- Matches app color scheme
- Accessible with proper semantic HTML

**Difficulty:** Beginner
**Estimated Time:** 2 hours
```

## Issue 19: Add Activity Icons
**Title:** Add Icon Library for All Activity Types
**Labels:** good first issue, design, hacktoberfest
**Description:**
```
Create consistent icon system for all activities

## Tasks
- [ ] Use Heroicons or create custom icon mappings
- [ ] Add icons for: emails, video calls, streaming, gaming, coding, browsing
- [ ] Create `src/utils/activityIcons.tsx` helper
- [ ] Update ActivityForm to show icons
- [ ] Add icons to activity history display
- [ ] Ensure icons are color-coded by impact level

## Acceptance Criteria
- All activities have appropriate icons
- Icons are consistent size (24x24px)
- Color coding: green (low), yellow (medium), red (high)
- Icons appear in forms and history

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 20: Add Input Validation Messages
**Title:** Improve Form Validation with Clear Error Messages
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add user-friendly validation messages to forms

## Tasks
- [ ] Add validation to ActivityForm inputs
- [ ] Show inline error messages (red text below inputs)
- [ ] Validate: duration > 0, quantity > 0, activity type selected
- [ ] Add helpful hints (e.g., "Enter duration in minutes")
- [ ] Prevent form submission when invalid
- [ ] Add visual indicators (red border on invalid fields)

## Acceptance Criteria
- Clear error messages appear immediately
- Users can't submit invalid data
- Visual feedback is obvious
- Messages are helpful, not technical
- Accessibility: errors announced to screen readers

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 21: Add Activity History Sorting
**Title:** Add Sorting Options to Activity History
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Allow users to sort their activity history

## Tasks
- [ ] Add dropdown for sort options: "Newest First", "Oldest First", "Highest Impact", "Lowest Impact"
- [ ] Implement sorting logic in activity list
- [ ] Save sort preference to localStorage
- [ ] Add sort icon to dropdown
- [ ] Update UI to show current sort order

## Acceptance Criteria
- Sorting works for all options
- Preference persists across sessions
- UI clearly shows current sort
- Smooth transitions when sorting

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 22: Create 404 Error Page
**Title:** Design Custom 404 Error Page
**Labels:** good first issue, design, hacktoberfest
**Description:**
```
Create a friendly, themed 404 error page

## Tasks
- [ ] Create `src/app/not-found.tsx` (Next.js 15 convention)
- [ ] Add eco-themed illustration or emoji (🌱🔍)
- [ ] Include helpful message: "This page seems to have zero carbon footprint... because it doesn't exist!"
- [ ] Add "Go Home" button
- [ ] Make it responsive
- [ ] Match app's design system

## Acceptance Criteria
- Appears when user visits invalid route
- Friendly, on-brand messaging
- Working navigation back to home
- Responsive design

**Difficulty:** Beginner
**Estimated Time:** 1-2 hours
```

## Issue 23: Add Activity Count Badge
**Title:** Show Total Activity Count Badge
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Display total number of tracked activities

## Tasks
- [ ] Create stat card component in dashboard
- [ ] Calculate total activities from database
- [ ] Show count with nice formatting (e.g., "127 activities tracked")
- [ ] Add icon (📊 or 📈)
- [ ] Add hover effect showing "since [join date]"
- [ ] Update count in real-time when new activity added

## Acceptance Criteria
- Count displays accurately
- Updates immediately on new activity
- Attractive card design
- Matches other dashboard cards

**Difficulty:** Beginner
**Estimated Time:** 2 hours
```

## Issue 24: Add Placeholder States
**Title:** Create Empty States for Dashboard Components
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Show helpful messages when users have no data yet

## Tasks
- [ ] Add empty state for activity history: "No activities yet! Add your first one above."
- [ ] Add empty state for charts: "Add activities to see your carbon footprint trends"
- [ ] Add empty state for badges: "Complete actions to unlock badges!"
- [ ] Add empty state for goals: "Set your first carbon reduction goal"
- [ ] Include friendly illustrations or emojis
- [ ] Add call-to-action buttons

## Acceptance Criteria
- Empty states appear when no data exists
- Messages are encouraging and helpful
- Visual design is appealing
- CTAs guide users to next action

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 25: Add Browser Tab Title Updates
**Title:** Dynamic Page Titles for Better Navigation
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Update browser tab title based on current page

## Tasks
- [ ] Set titles in each page component
- [ ] Format: "Dashboard | Carbon Tracker", "Goals | Carbon Tracker", etc.
- [ ] Update `src/app/layout.tsx` with base metadata
- [ ] Add favicon (🌱 emoji or custom)
- [ ] Include meta description for SEO

## Example Titles
- Dashboard → "Dashboard | Carbon Tracker"
- Tips → "Eco Tips | Carbon Tracker"
- Badges → "Achievements | Carbon Tracker"

**Difficulty:** Beginner
**Estimated Time:** 1 hour
```

## Issue 26: Add Hover Tooltips
**Title:** Add Informative Tooltips Throughout App
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add tooltips to explain features and CO2 values

## Tasks
- [ ] Create reusable `Tooltip.tsx` component
- [ ] Add tooltips to CO2 factors explaining calculations
- [ ] Add tooltips to badges explaining how to unlock them
- [ ] Add tooltips to chart data points
- [ ] Use browser's built-in `title` attribute or custom component
- [ ] Ensure mobile-friendly (tap to show)

## Acceptance Criteria
- Tooltips appear on hover (desktop) and tap (mobile)
- Clear, concise explanations
- Consistent design
- Accessible (keyboard navigation)

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 27: Add Confirmation Dialog Component
**Title:** Create Reusable Confirmation Modal
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Build a reusable confirmation dialog for destructive actions

## Tasks
- [ ] Create `src/components/ui/ConfirmDialog.tsx`
- [ ] Add props: title, message, onConfirm, onCancel
- [ ] Add danger variant (red) and standard variant
- [ ] Include backdrop overlay
- [ ] Add keyboard support (Enter to confirm, Esc to cancel)
- [ ] Make it accessible (focus trap, ARIA labels)

## Use Cases
- Delete activity
- Reset all data
- Sign out
- Clear goals

**Difficulty:** Beginner
**Estimated Time:** 3 hours
```

## Issue 28: Add Social Proof Section
**Title:** Create "Impact by Numbers" Statistics Section
**Labels:** good first issue, content, hacktoberfest
**Description:**
```
Show motivational statistics about collective impact

## Tasks
- [ ] Create statistics component
- [ ] Add mock data: "X tons of CO2 tracked", "Y users taking action"
- [ ] Display in attractive card layout
- [ ] Add countup animation effect (optional)
- [ ] Make numbers update daily (can be hardcoded for now)
- [ ] Add inspirational tagline

## Example Stats
- "10,000+ activities tracked"
- "2.5 tons CO2 awareness raised"
- "500+ eco-warriors joined"

**Difficulty:** Beginner
**Estimated Time:** 2 hours
```

## Issue 29: Add README Badges
**Title:** Enhance README with Project Badges
**Labels:** good first issue, documentation, hacktoberfest
**Description:**
```
Add informative badges to README.md

## Badges to Add
- [ ] Hacktoberfest 2025 badge
- [ ] License badge (MIT)
- [ ] Build status badge
- [ ] Version badge
- [ ] Made with Next.js badge
- [ ] TypeScript badge
- [ ] Contributors badge
- [ ] Stars/Forks badges

## Tasks
- [ ] Add badges at top of README
- [ ] Ensure all badge links work
- [ ] Arrange badges in logical order
- [ ] Use shields.io or badgen.net

**Difficulty:** Beginner
**Estimated Time:** 30 minutes
```

## Issue 30: Add Code Comments and JSDoc
**Title:** Add JSDoc Comments to Utility Functions
**Labels:** good first issue, documentation, hacktoberfest
**Description:**
```
Improve code documentation with JSDoc comments

## Tasks
- [ ] Add JSDoc to all functions in `src/lib/calculations/carbonFootprint.ts`
- [ ] Add JSDoc to `src/utils/` helper functions
- [ ] Include @param, @returns, and @example tags
- [ ] Add file-level comments explaining purpose
- [ ] Follow TSDoc standards

## Example
```typescript
/**
 * Calculates CO2 emissions for an activity
 * @param activityType - Type of activity performed
 * @param duration - Duration in minutes
 * @returns CO2 emissions in grams
 * @example
 * calculateEmissions('streaming', 60) // returns 36
 */
```

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 31: Add Loading Spinner Component
**Title:** Create Simple Loading Spinner Component
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Create a reusable loading spinner for async operations

## Tasks
- [ ] Create `src/components/ui/Spinner.tsx`
- [ ] Add a simple CSS-based spinning animation
- [ ] Support small, medium, and large sizes
- [ ] Add color variants (primary, white, gray)
- [ ] Use it in the dashboard while data loads

## Acceptance Criteria
- Spinner renders with smooth rotation
- Size props work correctly (sm, md, lg)
- Color variants match theme
- Accessible (has aria-label="Loading")
- No external libraries needed

**Difficulty:** Beginner
**Estimated Time:** 1-2 hours
```

## Issue 32: Add "Scroll to Top" Button
**Title:** Add Scroll to Top Button for Long Pages
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Add a floating button that appears when scrolling down

## Tasks
- [ ] Create `src/components/ui/ScrollToTop.tsx`
- [ ] Show button only when user scrolls down 300px
- [ ] Position fixed in bottom-right corner
- [ ] Smooth scroll animation to top on click
- [ ] Add up arrow icon (↑ or use Heroicons)
- [ ] Add fade-in/fade-out animation

## Acceptance Criteria
- Button appears after scrolling down
- Smooth scroll to top on click
- Doesn't overlap other UI elements
- Accessible (keyboard support)
- Works on mobile and desktop

**Difficulty:** Beginner
**Estimated Time:** 1-2 hours
```

## Issue 33: Add Activity Type Emojis
**Title:** Add Emoji Icons to Activity Types
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Enhance activity types with colorful emoji icons

## Tasks
- [ ] Update `src/constants/co2Factors.ts` to include emoji for each activity
- [ ] Add emojis: 📧 (email), 📹 (video call), 🎬 (streaming), 💻 (coding), 🌐 (browsing)
- [ ] Display emojis in activity dropdown
- [ ] Show emojis in activity history list
- [ ] Update TypeScript types to include emoji property

## Acceptance Criteria
- All activities have appropriate emojis
- Emojis display in forms and history
- Consistent emoji size across app
- Types are properly updated

**Difficulty:** Beginner
**Estimated Time:** 1 hour
```

## Issue 34: Add Contributing Guidelines
**Title:** Create CONTRIBUTING.md File
**Labels:** good first issue, documentation, hacktoberfest
**Description:**
```
Create a comprehensive contributing guide for new contributors

## Tasks
- [ ] Create `CONTRIBUTING.md` in root directory
- [ ] Add "Getting Started" section with setup instructions
- [ ] Explain how to run the project locally
- [ ] Add code style guidelines
- [ ] Include PR submission process
- [ ] Add "Good First Issues" section
- [ ] Include Code of Conduct reference
- [ ] Add contact information for questions

## Sections to Include
1. Getting Started
2. Development Setup
3. Making Changes
4. Submitting Pull Requests
5. Code Style
6. Testing Guidelines
7. Getting Help

**Difficulty:** Beginner
**Estimated Time:** 1-2 hours
```

## Issue 35: Add "Last Active" Timestamp
**Title:** Show When User Last Added Activity
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Display when the user last added an activity to the tracker

## Tasks
- [ ] Add timestamp display in dashboard header
- [ ] Format as "Last activity: 2 hours ago" using relative time
- [ ] Store last activity time in localStorage or database
- [ ] Update timestamp when new activity is added
- [ ] Show "No activities yet" if user hasn't added any
- [ ] Use a nice subtle style (gray text, small font)

## Acceptance Criteria
- Timestamp updates when activity added
- Relative time is human-readable ("2 hours ago", "yesterday", etc.)
- Doesn't clutter the UI
- Updates across page refreshes

**Difficulty:** Beginner
**Estimated Time:** 1-2 hours
```

## Issue 36: Add Activity Type Descriptions
**Title:** Add Helpful Descriptions to Activity Types
**Labels:** good first issue, content, hacktoberfest
**Description:**
```
Add descriptive tooltips/text for each activity type to help users understand what counts

## Tasks
- [ ] Add description field to activity types in `src/types/index.ts`
- [ ] Write clear descriptions for each activity:
  - Email: "Sending and receiving emails"
  - Video Call: "Zoom, Teams, Google Meet calls"
  - Streaming: "Netflix, YouTube, Spotify"
  - Coding: "Using IDEs, compiling code"
  - Browsing: "General web browsing"
- [ ] Display descriptions in activity dropdown (small gray text)
- [ ] Add info icon (ℹ️) that shows description on hover

## Acceptance Criteria
- All activity types have clear descriptions
- Descriptions appear in activity form
- Text is concise (under 10 words)
- Helps users choose correct activity type
- Mobile-friendly display

**Difficulty:** Beginner
**Estimated Time:** 1 hour
```

## Issue 37: Add Keyboard Shortcut Hints
**Title:** Display Keyboard Shortcuts Help Panel
**Labels:** good first issue, accessibility, hacktoberfest
**Description:**
```
Create a help panel that shows available keyboard shortcuts

## Tasks
- [ ] Create `src/components/ui/KeyboardShortcuts.tsx` modal
- [ ] Add "?" key to open shortcuts modal
- [ ] List all available shortcuts:
  - Ctrl+1: Dashboard
  - Ctrl+2: Activities
  - Ctrl+3: Tips
  - Ctrl+4: Goals
  - Ctrl+5: Badges
  - ?: Show help
  - Esc: Close modals
- [ ] Display in nice table/grid format
- [ ] Add close button and Esc key handler
- [ ] Show "Press ? for shortcuts" hint in footer

## Acceptance Criteria
- Modal opens when pressing "?"
- All shortcuts listed clearly
- Modal closes with Esc or close button
- Doesn't interfere with form inputs
- Accessible and mobile-responsive

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 38: Add Carbon Saving Celebration Animation
**Title:** Add Celebratory Animation for Milestones
**Labels:** good first issue, enhancement, fun, hacktoberfest
**Description:**
```
Show a fun animation when users reach carbon reduction milestones

## Tasks
- [ ] Create confetti or celebration animation component
- [ ] Trigger when user achieves milestones:
  - First activity logged
  - 10 activities logged
  - 100g CO2 tracked
  - 1kg CO2 tracked
  - Unlocking a badge
- [ ] Use CSS animations (no heavy libraries)
- [ ] Add celebratory message with milestone
- [ ] Auto-dismiss after 3 seconds
- [ ] Add sound effect (optional, with mute option)

## Acceptance Criteria
- Animation triggers at correct milestones
- Doesn't block user interaction
- Smooth and performant
- Works on mobile devices
- User can dismiss early if desired
- Celebration feels rewarding!

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 39: Add "Share Your Stats" Feature
**Title:** Add Social Media Sharing Buttons
**Labels:** good first issue, social, hacktoberfest
**Description:**
```
Allow users to share their carbon reduction achievements on social media

## Tasks
- [ ] Create `src/components/ui/ShareButton.tsx` component
- [ ] Add share buttons for:
  - Twitter/X
  - Facebook
  - LinkedIn
  - Copy link
- [ ] Generate shareable text: "I've tracked [X]g of CO2 with Carbon Tracker! 🌱 #CarbonFootprint"
- [ ] Add share button to dashboard and badge pages
- [ ] Include app URL in shared content
- [ ] Use Web Share API for mobile devices

## Acceptance Criteria
- Share buttons work correctly
- Pre-filled text includes user's stats
- Opens social platform in new tab
- Copy link shows success message
- Mobile uses native share when available
- Links include UTM parameters for tracking

**Difficulty:** Beginner
**Estimated Time:** 2-3 hours
```

## Issue 40: Add "Tips of the Day" Rotation
**Title:** Implement Rotating Tip of the Day
**Labels:** good first issue, enhancement, hacktoberfest
**Description:**
```
Show a different eco-tip each day to keep content fresh

## Tasks
- [ ] Create tip rotation logic in `src/utils/tipRotation.ts`
- [ ] Use current date to determine which tip to show
- [ ] Create "Tip of the Day" component for dashboard
- [ ] Display prominently with lightbulb icon 💡
- [ ] Add "Show next tip" button to cycle through
- [ ] Save viewed tips to localStorage (don't repeat for 30 days)
- [ ] Add "All Tips" link to view full list

## Acceptance Criteria
- Different tip shown each day automatically
- Tip changes at midnight
- Users can manually cycle through tips
- Viewed tips tracked to avoid repetition
- Links to full tips section
- Attractive card design matches dashboard
- Works without account/login

**Difficulty:** Beginner
**Estimated Time:** 2 hours
```

---

## How to Create These Issues:

1. Go to https://github.com/Eshaan-byte/Carbon-Tracker/issues
2. Click "New Issue"
3. Copy the title and description for each issue
4. Add the specified labels
5. Click "Submit new issue"

Repeat for all 30 issues! 🎉