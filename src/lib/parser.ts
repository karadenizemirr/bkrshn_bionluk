export const parseDate = (date: any) => {
    try {
        return new Date(date).toLocaleDateString('tr-TR')
    } catch (err) {
        return ""
    }
}

export const toDate = (date: any) => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    ((timeDifference % (1000 * 60 * 60)) / (1000 * 60)) % 60
  );

  let result = "";
  if (daysDifference > 0) {
    result += `${daysDifference} gün `;
  }
  if (hoursDifference > 0 || daysDifference > 0) {
    result += `${hoursDifference} saat `;
  }
  if (minutesDifference > 0 || hoursDifference > 0 || daysDifference > 0) {
    result += `${minutesDifference} dakika önce`;
  }

  return result.trim();
};

export const sliceText = (text: string, limit: number) => {
  const maxLength = limit;
  let slicedText = text.slice(0, maxLength);

  // HTML etkilerini koruyarak en fazla 50 karakteri bul
  const lastTagIndex = slicedText.lastIndexOf('<');
  if (lastTagIndex !== -1) {
    slicedText = slicedText.slice(0, lastTagIndex);
  }

  if (slicedText.length < text.length) {
    slicedText += '...';
  }

  return slicedText;
};