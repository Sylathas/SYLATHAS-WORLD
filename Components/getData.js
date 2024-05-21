import { collection, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';

export const WorkData = async () => {
    //Get projects data
    const projects = [];
    await getDocs(collection(db, "work"), orderBy("created_on", "desc"))
        .then((querySnapshot) => {
            querySnapshot.forEach(project => {
                projects.push({
                    id: project.id,
                    ...project.data()
                })
            });
        });

    return projects;
};

export const TextData = async () => {
    //Get about data
    const about = [];
    await getDocs(collection(db, "room_texts"))
        .then((querySnapshot) => {
            querySnapshot.forEach(text => {
                about.push({
                    id: text.id,
                    ...text.data()
                })
            });
        });
    return about;
};

export const VaultData = async () => {
    //Get about data
    const about = [];
    await getDocs(collection(db, "vault"))
        .then((querySnapshot) => {
            querySnapshot.forEach(text => {
                about.push({
                    id: text.id,
                    ...text.data()
                })
            });
        });
    return about;
};