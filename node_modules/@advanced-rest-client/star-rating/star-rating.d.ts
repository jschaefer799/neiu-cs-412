import {StarRating} from './src/StarRating';

declare global {
  interface HTMLElementTagNameMap {
    "star-rating": StarRating;
  }
}
