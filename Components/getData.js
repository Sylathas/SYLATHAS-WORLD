import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase.js';

export const WorkData = async () => {
    //Get projects data
    const projects = [];
    try {
        const querySnapshot = await getDocs(collection(db, "work"));
        querySnapshot.forEach(project => {
            projects.push({
                id: project.id,
                ...project.data()
            });
        });
    } catch (error) {
        console.error('Error fetching work data:', error);
    }

    return projects;
};

export const TextData = async () => {
    //Get about data
    const about = [];
    try {
        const querySnapshot = await getDocs(collection(db, "room_texts"));
        querySnapshot.forEach(text => {
            about.push({
                id: text.id,
                ...text.data()
            });
        });
    } catch (error) {
        console.error('Error fetching text data:', error);
    }
    return about;
};

export const VaultData = async () => {
    //Get about data
    const about = [];
    try {
        const querySnapshot = await getDocs(collection(db, "vault"));
        querySnapshot.forEach(text => {
            about.push({
                id: text.id,
                ...text.data()
            });
        });
    } catch (error) {
        console.error('Error fetching vault data:', error);
    }
    return about;
};