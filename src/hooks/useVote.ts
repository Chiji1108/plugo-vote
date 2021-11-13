import { useAsync, useAsyncFn } from "react-use";
import { auth, db } from "../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  arrayUnion,
  serverTimestamp,
  runTransaction,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
  FieldValue,
  writeBatch,
  query,
  getDocs,
  orderBy,
  where,
  startAt,
} from "firebase/firestore";
import { useUser } from ".";
import { isValidPlaceResult } from "../utils/isValidPlaceResult";

/**
 * 投票
 * 1. ユーザーの最新のvoteが当日以外か
 * 2. マーカー作成
 *
 * initial load
 * 1. マーカー全て取得
 * 2. もし自分のなら色を変更
 * 2. マーカーそれぞれのvote数取得
 *
 * つまり
 * places
 * - placeId
 * - lat & lng
 * - votes [voteId]
 * - voters [userId]
 *
 * users
 * - votes
 *   - placeId
 *   - timestamp
 *
 *
 */

class Place {
  constructor(
    readonly lat: number,
    readonly lng: number,
    readonly voteIds: Array<string>,
    readonly voterIds: Array<string>
  ) {}
}

const placeConverter: FirestoreDataConverter<Place> = {
  toFirestore: (place) => {
    return {
      lat: place.lat,
      lng: place.lng,
      voteIds: place.voteIds,
      voderIds: place.voterIds,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Place(data.lat, data.lng, data.voteIds, data.voterIds);
  },
};

class Vote {
  constructor(
    readonly placeId: string,
    readonly timestamp: Timestamp | FieldValue
  ) {}
}

const voteConverter = {
  toFirestore(vote: Vote): DocumentData {
    return { placeId: vote.placeId, timestamp: vote.timestamp };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Vote>,
    options: SnapshotOptions
  ): Vote {
    const data = snapshot.data(options)!;
    return new Vote(data.placeId, data.timestamp);
  },
};

export const useVote = () => {
  const user = useUser();
  const [state, doVote] = useAsyncFn(
    async (placeResult: google.maps.places.PlaceResult) => {
      if (!isValidPlaceResult(placeResult)) {
        throw new Error("無効な場所です");
        //TODO: alert context作る
      }
      if (
        !placeResult.place_id ||
        !placeResult.geometry ||
        !placeResult.geometry.location
      )
        return;
      if (!user) {
        throw new Error("ログインしてください");
      }

      const votesRef = collection(db, "users", user.uid, "votes").withConverter(
        voteConverter
      );

      
      // console.log("投票");
      // const placeDocRef = doc(db, "places", placeResult.place_id).withConverter(
      //   placeConverter
      // );
      // const votesRef = collection(db, "users", user.uid, "votes").withConverter(
      //   voteConverter
      // );
      // const newVoteRef = doc(votesRef);

      // const today = new Date();
      // const q = query(votesRef, orderBy("timestamp"), startAt(new Date(today.getUTCFullYear(), today.getUTC))
      // getDocs()

      // const batch = writeBatch(db);

      // batch.set(
      //   placeDocRef,
      //   {
      //     lat: placeResult.geometry.location.lat(),
      //     lng: placeResult.geometry.location.lng(),
      //   },
      //   { merge: true }
      // );

      // batch.update(
      //   placeDocRef,
      //   {
      //     voteIds: arrayUnion(newVoteRef.id)
      //   }
      // )

      // batch.set(
      //   newVoteRef,
      //   {
      //     placeId: placeDocRef.id,
      //     timestamp: serverTimestamp(),
      //   }
      // )

      // try {
      //   await runTransaction(db, async (transaction) => {
      //     await transaction.get
      //   })
      // } catch (error) {

      // }

      // try {
      //   const newVote = await runTransaction(db, async (transaction) => {
      //     const voteDoc = await transaction.get(voteDocRef);
      //     if (!placeResult.place_id) throw "error";
      //     if (!voteDoc.exists()) {
      //       transaction.set(
      //         voteDocRef,
      //         new Vote(placeResult.place_id, serverTimestamp())
      //       );
      //       return Promise.resolve("追加した");
      //     } else {
      //       if (voteDoc.data().timestamp)
      //     }
      //   });
      // } catch (error) {
      //   console.error(error);
      // }
      // await setDoc(doc(db, "places", placeResult.place_id), {
      //   lat: placeResult.geometry.location.lat(),
      //   lng: placeResult.geometry.location.lng(),
      //   votes: arrayUnion(""),
      // });

      // await addDoc(addVoteRef, {
      //   place: "",
      //   timestamp: serverTimestamp(),
      // });
      // console.log("tuika");
    },
    []
  );
  // console.error(state.error);
  return { state, doVote };
};
