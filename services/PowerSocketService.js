import { ref, set, onValue, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export default function ({ database }, app, store) {
  return {
    findAllStatus (status, callback) {
      onValue(ref(database, 'PowerSocket'), (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val()

          const results = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            createdAt: new Date(data[key].createdAt)
          })) || []

          if (status !== 'ALL') {
            callback(results.filter(element => element.status === status))
            return;
          }

          callback(results.filter(element => element.status !== status));
        }
        if (!snapshot.val()) {
          const arrayEmpty = []
          callback(arrayEmpty)
        }
      });
    },
    async create ({ serialName, connection, status, data }) {
      await set(ref(database, `PowerSocket/${uuidv4()}`), {
        serialName,
        connection,
        status,
        createdAt: Date.now(),
        data
      })

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Create Successfully and waiting connection to device'
      )
    },
    async delete (id) {
      await remove(ref(database, `PowerSocket/${id}`))
      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Delete Successfully!'
      )
    }
  }
}
