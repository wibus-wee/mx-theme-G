export function transformDateFromCreatedAt(date: string): string {
  const dateNow = new Date();
  const dateCreated = new Date(date);
  const diff = Math.abs(dateNow.getTime() - dateCreated.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays > 7 ? `${dateCreated.getFullYear()}-${dateCreated.getMonth() + 1}-${dateCreated.getDate()}` : diffDays > 0 ? `${diffDays} 天前` : '今天';
}