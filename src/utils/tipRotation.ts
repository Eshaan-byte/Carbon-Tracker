
import { Tip } from '@/types';
import { TIPS_DATABASE } from '@/constants/tips';

const VIEWED_TIPS_KEY = 'viewedTips';
const LAST_TIP_DATE_KEY = 'lastTipDate';

type ViewedTips = {
  [id: string]: string; // { tipId: dateViewed }
};

const getPreviouslyViewedTips = (): ViewedTips => {
  if (typeof window === 'undefined') {
    return {};
  }
  const viewedTips = localStorage.getItem(VIEWED_TIPS_KEY);
  return viewedTips ? JSON.parse(viewedTips) : {};
};

const saveViewedTip = (tipId: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  const viewedTips = getPreviouslyViewedTips();
  viewedTips[tipId] = new Date().toISOString();
  localStorage.setItem(VIEWED_TIPS_KEY, JSON.stringify(viewedTips));
};

const isTipRecent = (dateViewed: string): boolean => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(dateViewed) > thirtyDaysAgo;
};

const getUnseenTips = (): Tip[] => {
  const viewedTips = getPreviouslyViewedTips();
  const unseenTips = TIPS_DATABASE.filter(tip => {
    const dateViewed = viewedTips[tip.id];
    return !dateViewed || !isTipRecent(dateViewed);
  });
  return unseenTips.length > 0 ? unseenTips : TIPS_DATABASE; // Fallback to all tips if all have been seen
};

export const getTodaysTip = (): Tip => {
  if (typeof window === 'undefined') {
    return TIPS_DATABASE[0];
  }
  const lastTipDate = localStorage.getItem(LAST_TIP_DATE_KEY);
  const today = new Date().toDateString();

  if (lastTipDate === today) {
    const lastTipId = localStorage.getItem('lastTipId');
    const lastTip = TIPS_DATABASE.find(tip => tip.id === lastTipId);
    if (lastTip) {
      return lastTip;
    }
  }

  const unseenTips = getUnseenTips();
  const todaysTip = unseenTips[Math.floor(Math.random() * unseenTips.length)];

  localStorage.setItem(LAST_TIP_DATE_KEY, today);
  localStorage.setItem('lastTipId', todaysTip.id);
  saveViewedTip(todaysTip.id);

  return todaysTip;
};

export const getNextTip = (currentTipId: string): Tip => {
  const unseenTips = getUnseenTips();
  let nextTip = unseenTips[Math.floor(Math.random() * unseenTips.length)];

  while (nextTip.id === currentTipId && unseenTips.length > 1) {
    nextTip = unseenTips[Math.floor(Math.random() * unseenTips.length)];
  }
  
  saveViewedTip(nextTip.id);
  localStorage.setItem('lastTipId', nextTip.id);


  return nextTip;
};
