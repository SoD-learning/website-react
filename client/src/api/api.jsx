import { startTransition } from "react";

// Register user
export const registerUser = async (email, password, role, name, bio) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + "/api/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role, name, bio }),
    },
  );

  if (!response.ok) {
    throw new Error("Error registering user");
  }

  return response;
};

// Fetch rooms
export const fetchRooms = async () => {
  const response = await fetch(import.meta.env.VITE_SITE_URL + "/api/rooms");
  if (!response.ok) {
    throw new Error("Error fetching rooms");
  }
  return await response.json();
};

// Fetch classes
export const fetchClasses = async () => {
  const response = await fetch(import.meta.env.VITE_SITE_URL + "/api/classes");
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  const data = await response.json();
  return data.map((item) => {
    return {
      ...item,
      // TODO: NOW (bio and expertise)
      bio: item.bio,
      expertise: item.trainer_expertise,
      room_capacity: item.room_capacity,
      signups_count: item.signups_count,
    };
  });
};

// Create class
export const createClass = async ({
  title,
  description,
  date,
  startTime,
  endTime,
  trainer, // ADDED trainer
  room,
}) => {
  const response = await fetch(import.meta.env.VITE_SITE_URL + "/api/class", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      date,
      start_time: startTime,
      end_time: endTime,
      trainer, // ADDED trainer
      room: room,
    }),
  });

  if (!response.ok) {
    throw new Error("Error creating class");
  }

  return response;
};

// Sign up for a class
export const signUpForClass = async (classId, userId) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/classes/${classId}/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    },
  );
  if (!response.ok) {
    throw new Error("Error signing up for class");
  }
};

// Fetch the classes a user has signed up to
export const fetchSignedUpClasses = async (userId) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/user/${userId}/signed-up-classes`,
  );
  if (!response.ok) {
    throw new Error("Error fetching signed-up classes data");
  }
  const data = await response.json();
  return data.map((item) => item.class_id);
};

// Cancel sign-up for a class
export const cancelClassSignUp = async (classId, userId) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/classes/${classId}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    },
  );
  if (!response.ok) {
    throw new Error("Error canceling class sign-up");
  }
};

// Fetch trainers
export const fetchTrainers = async () => {
  const response = await fetch(import.meta.env.VITE_SITE_URL + "/api/trainers");
  if (!response.ok) {
    throw new Error("Error fetching trainers data");
  }
  const data = await response.json();
  return data;
};

// Assign a trainer to a class
export const assignTrainerToClass = async (classId, trainerId) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/classes/${classId}/assign-trainer`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trainer_id: trainerId }),
    },
  );
  if (!response.ok) {
    throw new Error("Error assigning trainer to class");
  }
  return response;
};

// Add a new trainer
export const createTrainer = async (name, bio, expertise) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + "/api/add-trainer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, bio, expertise }),
    },
  );
  if (!response.ok) {
    throw new Error("Error adding trainer");
  }
  return response;
};

// TODO: NOW (update trainer bio)
// Update a trainer
export const updateTrainer = async (id, bio, expertise) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/trainer/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio, expertise }),
    },
  );
  if (!response.ok) {
    throw new Error("Error updating blog post");
  }
  return response;
};

// Upload XML documents
export const uploadXMLData = async (data) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + "/api/upload-xml",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to upload XML data");
  }

  return await response.json();
};

// Fetch blog posts
export const fetchBlogPosts = async () => {
  startTransition(async () => {
    const response = await fetch(
      import.meta.env.VITE_SITE_URL + "/api/blogposts",
    );
    if (!response.ok) {
      throw new Error("Error fetching blog posts");
    }
    return await response.json();
  });
};

// Create a new blog post
export const createBlogPost = async (title, content, author) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + "/api/blogposts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author }),
    },
  );
  if (!response.ok) {
    throw new Error("Error creating blog post");
  }
  return response;
};

// Update an existing blog post
export const updateBlogPost = async (id, title, content) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/blogpost/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    },
  );
  if (!response.ok) {
    throw new Error("Error updating blog post");
  }
  return response;
};

// Get a blog post
export const getBlogPost = async (id) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/blogpost/${id}`,
  );
  if (!response.ok) {
    throw new Error("Error fetching blog post");
  }
  const data = await response.json();
  return data;
};

// Delete a blog post
export const deleteBlogPost = async (id) => {
  const response = await fetch(
    import.meta.env.VITE_SITE_URL + `/api/blogposts/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  console.log("Response:", response);
  if (!response.ok) {
    throw new Error("Error deleting blog post");
  }
};
