const mockComments = [
    {
      id: 1,
      author: 'Alice',
      content: '이 포스트 정말 유익하네요!',
      createdAt: '2024.08.01',
      replies: [
        {
          id: 1.1,
          author: 'Dave',
          content: '맞아요, 저도 많은 도움이 됐어요!',
          createdAt: '2024.08.01',
        },
        {
          id: 1.2,
          author: 'Eve',
          content: '저도 동의해요. 좋은 정보 감사합니다.',
          createdAt: '2024.08.01',
        },
      ],
    },
    {
      id: 2,
      author: 'Bob',
      content: '감사합니다! 많은 도움이 되었어요.',
      createdAt: '2024.08.01',
      replies: [],
    },
    {
      id: 3,
      author: 'Charlie',
      content: '더 자세한 설명이 필요해요. 궁금한 부분이 좀 있네요.',
      createdAt: '2024.08.01',
      replies: [
        {
          id: 3.1,
          author: 'Frank',
          content: '어떤 부분이 궁금하신가요? 저도 도와드리고 싶어요.',
          createdAt: '2024.08.01',
        },
      ],
    },
  ];
  
  export default mockComments;
  