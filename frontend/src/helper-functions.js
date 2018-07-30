export const getAverageRating = (ratings) => {
   let total = 0;
   let rating = '';
   ratings.forEach(({rating}) => {
      total += rating;
   });
   rating = (total / ratings.length).toString().slice(0, 3);
   if(rating.length < 2){
      rating += '.0';
   }
   return rating;
}