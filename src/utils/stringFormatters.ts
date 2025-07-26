export const formatMemberSince = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};

export const formatLastLogin = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatProjectCount = (count: number): string => {
  return count === 1 ? '1 Project' : `${count} Projects`;
};

export const formatProjectDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};