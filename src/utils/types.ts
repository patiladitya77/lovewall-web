export type Testimonial = {
  feedbackType: string;
  feedback: string;
  name: string;
  senderEmail: string;
  videoUrl: string;
  spaceId: string;
  starRating: number;
  _id: string;
  isLiked: boolean;
};

export interface Wall {
  _id: string;
  name: string;
  createdAt: string;
  wallType: string;
  darkMode: boolean;
  showMore: boolean;
}
