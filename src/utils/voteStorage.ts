export const getVoteStatus = (spotId: number): 'upvoted' | 'downvoted' | null => {
    const votes = JSON.parse(localStorage.getItem('spotVotes') || '{}');
    return votes[spotId] || null;
  };

  export const saveVote = (spotId: number, voteType: 'upvoted' | 'downvoted') => {
    const votes = JSON.parse(localStorage.getItem('spotVotes') || '{}');
    votes[spotId] = voteType;
    localStorage.setItem('spotVotes', JSON.stringify(votes));
  };