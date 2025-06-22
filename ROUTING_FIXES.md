# Routing Fixes - emBrace Application

## Problem Identified
The application was bypassing the onboarding phase after sign-up due to a race condition between two navigation events:

1. **Sign-up function** → Navigate to `/onboarding` (100ms delay)
2. **Auth state change** → Navigate to `/` (0ms delay)

The 0ms delay always won, causing users to go directly to the chat interface.

## Fixes Implemented

### 1. Fixed AuthContext SIGNED_IN Event Handler
**File**: `src/contexts/AuthContext.tsx`

**Before**:
```typescript
if (event === 'SIGNED_IN') {
  setTimeout(() => {
    navigate('/'); // Always went to chat!
  }, 0);
}
```

**After**:
```typescript
if (event === 'SIGNED_IN') {
  setTimeout(async () => {
    if (session?.user) {
      const appropriateRoute = await getAppropriateRoute(session.user.id);
      navigate(appropriateRoute);
      updateLoginCount(session.user.id);
    } else {
      navigate('/');
    }
  }, 0);
}
```

### 2. Created Route Utility Functions
**File**: `src/utils/routeUtils.ts`

Added centralized functions to check onboarding status:
- `hasCompletedOnboarding(userId)` - Returns boolean
- `getAppropriateRoute(userId)` - Returns appropriate route

### 3. Added Onboarding Page Protection
**File**: `src/components/onboarding/OnboardingPage.tsx`

Added check to prevent users who have already completed onboarding from going through it again:
```typescript
useEffect(() => {
  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    const completed = await hasCompletedOnboarding(user.id);
    if (completed) {
      navigate('/'); // Redirect to chat
    }
  };
  
  checkOnboardingStatus();
}, [user, navigate]);
```

### 4. Added Chat Page Protection
**File**: `src/pages/Index.tsx`

Added check to redirect users who haven't completed onboarding:
```typescript
useEffect(() => {
  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    const completed = await hasCompletedOnboarding(user.id);
    if (!completed) {
      navigate('/onboarding'); // Redirect to onboarding
    }
  };
  
  checkOnboardingStatus();
}, [user, navigate]);
```

### 5. Fixed AI Chat Interface
**File**: `src/components/AiChatInterface.tsx`

Fixed typo in function name:
```typescript
// Before
const responseContent = await generateRense(input);

// After
const responseContent = await generateResponse(input, user?.id || '', JSON.stringify(messages));
```

## Expected Flow Now

### New User Sign-Up:
1. **Sign Up** → User account created
2. **Auth State Change** → Check onboarding status → Navigate to `/onboarding`
3. **Onboarding Complete** → Save data → Navigate to `/`
4. **Chat Interface** → User can now chat

### Returning User Sign-In:
1. **Sign In** → User authenticated
2. **Auth State Change** → Check onboarding status → Navigate to appropriate route
3. **If onboarding completed** → Navigate to `/` (chat)
4. **If onboarding not completed** → Navigate to `/onboarding`

### Direct Navigation Protection:
- **User tries to access `/` without onboarding** → Redirected to `/onboarding`
- **User tries to access `/onboarding` after completion** → Redirected to `/`

## Testing

Created test file: `src/utils/__tests__/routeUtils.test.ts`

Tests cover:
- ✅ User with completed onboarding → Returns true
- ✅ User without completed onboarding → Returns false
- ✅ Appropriate route for completed user → Returns "/"
- ✅ Appropriate route for incomplete user → Returns "/onboarding"

## Result

The routing now properly enforces the flow: **Sign Up → Onboarding → Chat**, ensuring users complete the onboarding process before accessing the chat interface. 