let specials = {
  placeholder1: {
    name: 'Atk special',
    description: 'A detailed description about nothing',
    variant: {
      type: 'ATK',
      cooldown: '15s',
      /*if Buff*/ duration: '',
      modifier: {
        type: 'multiplier, additive',
        value: 6.75,
      },
    },
  },
  placeholder2: {
    name: 'healing special',
    description: 'description',
    variant: {
      type: 'HLG',
      cooldown: '120s',
      /*if Buff*/ duration: '',
      modifier: {
        type: 'multiplier, additive',
        value: 3,
      },
    },
  },

  placeholder3: {
    name: 'buffing special',
    description: 'description',
    variant: {
      type: 'BUF',
      cooldown: '/',
      /*if Buff*/ duration: '45s',
      modifier: {
        /*if Buff*/ duration: '',
        type: 'multiplier, additive',
        value: '3',
      },
    },
  },

  placeholder4: {
    name: 'placeholder4',
    description: 'description',
    variant: {
      type: 'healing, buff, attack',
      /*if Buff*/ duration: '',
      cooldown: 'timeout duration before action Bar build up',
      modifier: {
        type: 'multiplier, additive',
        value: 2,
      },
    },
  },
};

export default specials;
