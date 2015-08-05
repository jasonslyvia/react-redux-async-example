import superagent from 'superagent';
import querystring from 'querystring';

export default function getNewsMiddleware({getState}) {
  return (next) => {
    return (action) => {
      if (!action.types) {
        next(action);
        return;
      }

      const [PENDING, FULFILLED, REJECTED] = action.types;

      const state = getState();
      let params = {...action.params};

      if (action.fields) {
        action.fields.forEach(field => {
          if (state.news[field]) {
            params[field] = state.news[field];
          }
        });
      }

      next({
        type: PENDING,
        params
      });

      return superagent
              .get(`http://127.0.0.1:7261/api/channels/${params.channelId || ''}?${querystring.stringify(params)}`)
              .end((err, res) => {
                if (err || !res.body || res.body.code !== 0) {
                  next({
                    type: REJECTED,
                    params
                  });
                }
                else {
                  next({
                    type: FULFILLED,
                    params,
                    data: res.body.data
                  });
                }
              });
    };
  };
};
