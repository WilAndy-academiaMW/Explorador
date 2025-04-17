document.addEventListener('DOMContentLoaded', () => {
  // Initialize array of profile pictures
  const profilePics = [
    "suit-cat-semga.gif",
    "artworks-KwcksS3BO6vHKbBa-3irc8Q-t1080x1080.jpg",
    "an871k4o1sn51 (1).png",
    "trollface (2).png"
  ];

  const adjectives = ["Cool", "Epic", "Awesome", "Rad", "Super", "Ultra", "Mega", "Pro", "Elite", "Royal"];
  const nouns = ["Gamer", "Player", "Master", "Champion", "Warrior", "Legend", "Hero", "King", "Queen", "Star"];
  const numbers = ["69", "420", "1337", "999", "777", "123", "555", "888", "000", "111"];

  function generateUsername() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    return `${adjective}${noun}${number}`;
  }

  // Add profile modal
  document.body.insertAdjacentHTML('beforeend', `
    <div class="profile-modal">
      <div class="profile-content">
        <div class="profile-header">
          <h2>Edit Profile</h2>
          <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="profile-pics">
          ${profilePics.map(pic => `
            <img src="${pic}" alt="Profile option" class="profile-pic-option">
          `).join('')}
        </div>
        <div class="username-section">
          <h3>Username</h3>
          <div class="username-controls">
            <div id="generatedUsername">Username</div>
            <button class="generate-btn">Generate</button>
          </div>
        </div>
        <button class="save-profile">Save Changes</button>
      </div>
    </div>
  `);

  // Add profile functionality
  const profileButton = document.getElementById('profileButton');
  const profileModal = document.querySelector('.profile-modal');
  const closeBtn = document.querySelector('.close-btn');
  const generateBtn = document.querySelector('.generate-btn');
  const profilePicOptions = document.querySelectorAll('.profile-pic-option');
  const currentProfilePic = document.getElementById('currentProfilePic');
  const currentUsername = document.getElementById('currentUsername');
  const generatedUsernameElement = document.getElementById('generatedUsername');
  const saveProfileBtn = document.querySelector('.save-profile');

  let selectedProfilePic = profilePics[0];

  profileButton.addEventListener('click', () => {
    profileModal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    profileModal.classList.remove('active');
  });

  generateBtn.addEventListener('click', () => {
    generatedUsernameElement.textContent = generateUsername();
  });

  profilePicOptions.forEach(pic => {
    pic.addEventListener('click', () => {
      profilePicOptions.forEach(p => p.classList.remove('selected'));
      pic.classList.add('selected');
      selectedProfilePic = pic.src;
    });
  });

  saveProfileBtn.addEventListener('click', () => {
    currentProfilePic.src = selectedProfilePic;
    currentUsername.textContent = generatedUsernameElement.textContent;
    profileModal.classList.remove('active');
  });

  // Generate initial username
  generatedUsernameElement.textContent = generateUsername();

  // Add pro status tracking
  let isPro = false;

  // Add pro modal HTML
  document.body.insertAdjacentHTML('beforeend', `
    <div class="pro-modal">
      <div class="pro-content">
        <div class="pro-header">
          <h2>Upgrade to Pro</h2>
          <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="pro-features">
          <div class="pro-feature">
            <i class="fas fa-upload"></i>
            <h3>Upload Custom Songs</h3>
            <p>Add your own music to your library</p>
          </div>
          <div class="pro-feature">
            <i class="fas fa-ban"></i>
            <h3>Ad-Free Experience</h3>
            <p>Enjoy uninterrupted music</p>
          </div>
          <div class="pro-feature">
            <i class="fas fa-star"></i>
            <h3>Pro Badge</h3>
            <p>Show off your premium status</p>
          </div>
        </div>
        <div class="pro-pricing">
          <h3>$9.99/month</h3>
          <button class="upgrade-pro-btn">Upgrade Now</button>
        </div>
      </div>
    </div>

    <div class="upload-modal">
      <div class="upload-content">
        <div class="upload-header">
          <h2>Upload Music</h2>
          <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="upload-form">
          <div class="upload-dropzone">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drag and drop your audio files here</p>
            <p>or</p>
            <label class="upload-btn">
              Choose Files
              <input type="file" accept="audio/*" multiple style="display: none;">
            </label>
          </div>
          <div class="upload-list"></div>
        </div>
      </div>
    </div>
  `);

  // Pro modal functionality
  const upgradeBtn = document.querySelector('.upgrade-btn');
  const proModal = document.querySelector('.pro-modal');
  const uploadModal = document.querySelector('.upload-modal');
  const proCloseBtn = proModal.querySelector('.close-btn');
  const uploadCloseBtn = uploadModal.querySelector('.close-btn');
  const upgradeProbtn = proModal.querySelector('.upgrade-pro-btn');

  upgradeBtn.addEventListener('click', () => {
    proModal.classList.add('active');
  });

  proCloseBtn.addEventListener('click', () => {
    proModal.classList.remove('active');
  });

  uploadCloseBtn.addEventListener('click', () => {
    uploadModal.classList.remove('active');
  });

  upgradeProbtn.addEventListener('click', () => {
    isPro = true;
    proModal.classList.remove('active');
    upgradeBtn.innerHTML = `<i class="fas fa-star"></i> Pro`;
    upgradeBtn.classList.add('pro-active');
    
    // Add upload button to sidebar
    const playlists = document.querySelector('.playlists');
    const uploadBtn = document.createElement('div');
    uploadBtn.className = 'upload-music';
    uploadBtn.innerHTML = `
      <div class="upload-icon">
        <i class="fas fa-upload"></i>
      </div>
      Upload Music
    `;
    playlists.insertBefore(uploadBtn, playlists.firstChild);

    // Add upload functionality
    uploadBtn.addEventListener('click', () => {
      uploadModal.classList.add('active');
    });
  });

  // Upload functionality
  const uploadDropzone = document.querySelector('.upload-dropzone');
  const fileInput = uploadDropzone.querySelector('input[type="file"]');
  const uploadList = document.querySelector('.upload-list');

  uploadDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadDropzone.classList.add('dragover');
  });

  uploadDropzone.addEventListener('dragleave', () => {
    uploadDropzone.classList.remove('dragover');
  });

  uploadDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadDropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const song = {
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: 'Custom Upload',
            audio: e.target.result,
            cover: 'https://via.placeholder.com/150'
          };
          
          // Add to upload list
          const uploadItem = document.createElement('div');
          uploadItem.className = 'upload-item';
          uploadItem.innerHTML = `
            <div class="upload-item-info">
              <span>${song.title}</span>
              <div class="upload-progress">
                <div class="upload-progress-bar"></div>
              </div>
            </div>
          `;
          uploadList.appendChild(uploadItem);

          // Simulate upload progress
          let progress = 0;
          const interval = setInterval(() => {
            progress += 5;
            uploadItem.querySelector('.upload-progress-bar').style.width = `${progress}%`;
            
            if (progress >= 100) {
              clearInterval(interval);
              uploadItem.innerHTML = `
                <div class="upload-item-info">
                  <span>${song.title}</span>
                  <i class="fas fa-check"></i>
                </div>
              `;
              
              // Add song to library
              albumData.uploaded = albumData.uploaded || [];
              albumData.uploaded.push(song);
              
              // Create card for the uploaded song
              const songCard = createSongCard(song);
              cardGrid.insertAdjacentHTML('afterbegin', songCard);
              initializePlayButtons();
              initializeCardHoverEffects();
            }
          }, 100);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Initialize audio
  let currentAudio = null;
  let isPlaying = false;
  let currentPlayPromise = null; // Track the play promise
  const cardGrid = document.querySelector('.card-grid');
  const albumData = {
    ksi: [{
      title: "Thick Of It",
      artist: "KSI feat. Trippie Redd",
      audio: "KSI - Thick Of It (feat. Trippie Redd) [Official Music Video].mp3",
      cover: "ab67616d0000b27312e5ad29295bd49dd7e45a73.jfif"
    }],
    weezer_blue: [
      {
        title: "My Name Is Jonas",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 01 - My Name Is Jonas.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "No One Else",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 02 - No One Else.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "The World Has Turned And Left Me Here",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 03 - The World Has Turned And Left Me Here.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "Say It Ain't So",
        artist: "Weezer",
        audio: "Weezer - Say It Aint So.mp3",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "Undone - The Sweater Song",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 05 - Undone - The Sweater Song.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "Surf Wax America",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 06 - Surf Wax America.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "In The Garage",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 08 - In The Garage.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "Holiday",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 09 - Holiday.flac",
        cover: "IMG_20250118_004910.jpg"
      },
      {
        title: "Only In Dreams",
        artist: "Weezer",
        audio: "Weezer - Weezer (Blue Album) - 10 - Only In Dreams.flac",
        cover: "IMG_20250118_004910.jpg"
      }
    ],
    weezer_green: [{
      title: "Island in the Sun",
      artist: "Weezer",
      audio: "01 - Island in the Sun.mp3",
      cover: "Weezer_-_Green_Album.png"
    }],
    roblox: [{
      title: "Relaxed Scene",
      artist: "Roblox OST",
      audio: "Relaxed Scene.mp3",
      cover: "IMG_20250119_031320.jpg"
    }],
    pizza: [{
      title: "It's Pizza Time",
      artist: "Pizza Tower OST",
      audio: "Its Pizza Time.mp3",
      cover: "Spr_fakepeppino_intro3loop_0.gif"
    }],
    pvz: [{
      title: "Loonboon",
      artist: "Plants vs. Zombies OST",
      audio: "05. Loonboon.mp3",
      cover: "maxresdefault (1).jpg"
    }],
    undertale: [{
      title: "Megalovania",
      artist: "Undertale OST",
      audio: "Undertale - Megalovania - Game Guard.mp3",
      cover: "Sans_battle_idle.webp"
    }],
    deafkev: [{
      title: "Invincible",
      artist: "DEAF KEV",
      audio: "DEAF KEV - Invincible [NCS Release].mp3",
      cover: "Screenshot 2025-01-20 3.49.57 PM.png"
    }],
  };

  const libraryData = {
    sections: [
      {
        id: "ancient",
        title: "Ancient Civilizations",
        image: "https://via.placeholder.com/150?text=Ancient",
        articles: [
          {
            id: "mesopotamia",
            title: "The Rise of Mesopotamia",
            subtitle: "Cradle of Civilization",
            preview: "Discover the cradle of civilization...",
            content: [
              {
                type: "paragraph",
                text: "Mesopotamia, often called the cradle of civilization, was the birthplace of many innovations that would change human history forever. Located between the Tigris and Euphrates rivers, this fertile region saw the rise of the world's first cities, the invention of writing, and the emergence of complex social structures."
              },
              {
                type: "subheading",
                text: "The Birth of Cities"
              },
              {
                type: "paragraph",
                text: "The first cities emerged in Sumer around 4500 BCE. Uruk, possibly the world's first city, grew to become a major urban center. These early urban settlements revolutionized human society, creating new forms of social organization and cultural expression."
              },
              {
                type: "image",
                url: "https://via.placeholder.com/800x400?text=Ancient+Mesopotamian+City",
                caption: "Artist's reconstruction of an ancient Mesopotamian city"
              },
              {
                type: "subheading",
                text: "Writing and Knowledge"
              },
              {
                type: "paragraph",
                text: "The Sumerians developed cuneiform, one of the earliest writing systems. This innovation allowed for the recording of laws, literature, and commercial transactions, fundamentally changing how human knowledge was preserved and transmitted."
              }
            ],
            relatedArticles: ["egyptian-pyramids", "ancient-greece"]
          },
          // Similar structure for other articles...
        ],
        gallery: [
          {
            title: "Pyramids of Giza",
            description: "The last remaining wonder of the ancient world"
          },
          // ... existing gallery items
        ]
      },
      // ... other sections
    ]
  };

  function createSongCard(song) {
    return `
      <div class="card" data-audio="${song.audio}">
        <div class="card-img-container">
          <img src="${song.cover}" alt="${song.title}">
          <button class="play-button">
            <i class="fas fa-play"></i>
          </button>
        </div>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
  }

  function displayAlbum(albumId) {
    const songs = albumData[albumId];
    cardGrid.innerHTML = songs.map(song => createSongCard(song)).join('');
    initializePlayButtons();
    initializeCardHoverEffects();
  }

  // Featured albums click handling
  document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('click', () => {
      const albumId = item.dataset.album;
      displayAlbum(albumId);
    });
  });

  async function stopCurrentAudio() {
    if (currentAudio) {
      // Wait for any pending play operation to complete
      if (currentPlayPromise) {
        try {
          await currentPlayPromise;
        } catch (e) {
          console.warn('Previous play promise rejected:', e);
        }
      }
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentPlayPromise = null;
    }
  }

  function updatePlayIcon(playing) {
    const icon = document.querySelector('.play-pause i');
    icon.classList.remove(playing ? 'fa-play' : 'fa-pause');
    icon.classList.add(playing ? 'fa-pause' : 'fa-play');
  }

  function initializePlayButtons() {
    const playPauseBtn = document.querySelector('.play-pause');
    const cards = document.querySelectorAll('.card');

    playPauseBtn.addEventListener('click', async () => {
      if (currentAudio) {
        if (isPlaying) {
          await stopCurrentAudio();
          isPlaying = false;
        } else {
          currentPlayPromise = currentAudio.play();
          isPlaying = true;
        }
        updatePlayIcon(isPlaying);
      }
    });

    cards.forEach(card => {
      const playButton = card.querySelector('.play-button');
      const audioSrc = card.dataset.audio;
      
      playButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        // If same audio is playing, handle pause
        if (currentAudio && currentAudio.src.endsWith(audioSrc) && isPlaying) {
          await stopCurrentAudio();
          isPlaying = false;
          updatePlayIcon(false);
          return;
        }
        
        // Stop any currently playing audio
        await stopCurrentAudio();
        
        // Create new audio or reuse existing
        if (!currentAudio || !currentAudio.src.endsWith(audioSrc)) {
          currentAudio = new Audio(audioSrc);
        }
        
        try {
          currentPlayPromise = currentAudio.play();
          isPlaying = true;
          updatePlayIcon(true);
          
          // Update now playing info
          const trackName = card.querySelector('h3').textContent;
          const artistName = card.querySelector('p').textContent;
          const albumArt = card.querySelector('img').src;
          
          document.querySelector('.track-name').textContent = trackName;
          document.querySelector('.artist-name').textContent = artistName;
          document.querySelector('.now-playing img').src = albumArt;
          
          // Handle audio ending
          currentAudio.addEventListener('ended', () => {
            isPlaying = false;
            updatePlayIcon(false);
          });
        } catch (error) {
          console.error('Error playing audio:', error);
          isPlaying = false;
          updatePlayIcon(false);
        }
      });
    });
  }

  // Progress bar interaction
  const progressContainer = document.querySelector('.progress-container');
  const progress = document.querySelector('.progress');

  progressContainer.addEventListener('click', (e) => {
    const clickPosition = e.offsetX;
    const totalWidth = progressContainer.offsetWidth;
    const percentage = (clickPosition / totalWidth) * 100;
    progress.style.width = `${percentage}%`;
  });

  // Volume slider interaction
  const volumeSlider = document.querySelector('.volume-slider');
  const volumeProgress = document.querySelector('.volume-progress');

  volumeSlider.addEventListener('click', (e) => {
    const clickPosition = e.offsetX;
    const totalWidth = volumeSlider.offsetWidth;
    const percentage = (clickPosition / totalWidth) * 100;
    volumeProgress.style.width = `${percentage}%`;
  });

  // Like button interaction
  const likeBtn = document.querySelector('.like-btn');
  let isLiked = false;

  likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    const icon = likeBtn.querySelector('i');
    icon.classList.remove(isLiked ? 'far' : 'fas');
    icon.classList.add(isLiked ? 'fas' : 'far');
  });

  // Card hover effects
  function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const playButton = card.querySelector('.play-button');
      
      card.addEventListener('mouseenter', () => {
        playButton.style.opacity = '1';
        playButton.style.transform = 'translateY(0)';
      });

      card.addEventListener('mouseleave', () => {
        playButton.style.opacity = '0';
        playButton.style.transform = 'translateY(8px)';
      });
    });
  }

  // Add search functionality
  function getAllSongs() {
    return Object.values(albumData).flat();
  }

  let userPlaylists = [];
  let likedSongs = [];

  function createPlaylist() {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
      userPlaylists.push({
        name: playlistName,
        songs: []
      });
      updatePlaylistsUI();
    }
  }

  function updatePlaylistsUI() {
    const playlistsContainer = document.querySelector('.playlists');
    const existingButtons = playlistsContainer.querySelectorAll('.create-playlist, .liked-songs');
    
    // Clear existing playlists but keep buttons
    const playlistElements = playlistsContainer.querySelectorAll('.playlist-item');
    playlistElements.forEach(el => el.remove());
    
    // Add user playlists
    userPlaylists.forEach(playlist => {
      const playlistEl = document.createElement('div');
      playlistEl.className = 'playlist-item';
      playlistEl.innerHTML = `
        <i class="fas fa-music"></i>
        ${playlist.name}
      `;
      playlistEl.addEventListener('click', () => showPlaylist(playlist));
      
      // Insert before the liked songs button
      playlistsContainer.insertBefore(playlistEl, existingButtons[1]);
    });
  }

  function showPlaylist(playlist) {
    const contentArea = document.querySelector('.content');
    contentArea.innerHTML = `
      <header>
        <div class="header-buttons">
          <button class="nav-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="nav-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="user-menu">
          <button class="upgrade-btn">Upgrade</button>
          <button class="profile-btn">
            <img src="https://via.placeholder.com/28" alt="Profile" class="profile-img">
            Username
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
      </header>
      <section class="playlist-view">
        <h1>${playlist.name}</h1>
        <div class="playlist-actions">
          <button class="add-songs-btn">Add Songs</button>
        </div>
        <div class="card-grid">
          ${playlist.songs.map(song => createSongCard(song)).join('')}
        </div>
      </section>
    `;

    // Initialize add songs functionality
    const addButton = contentArea.querySelector('.add-songs-btn');
    addButton.addEventListener('click', () => showSongSelector(playlist));
    
    initializePlayButtons();
    initializeCardHoverEffects();
  }

  function showSongSelector(playlist) {
    const allSongs = getAllSongs();
    const modal = document.createElement('div');
    modal.className = 'song-selector-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Add Songs to ${playlist.name}</h2>
        <div class="song-list">
          ${allSongs.map(song => `
            <div class="song-item" data-title="${song.title}" data-artist="${song.artist}">
              <label>
                <input type="checkbox" ${playlist.songs.some(s => s.title === song.title) ? 'checked' : ''}>
                <span>${song.title} - ${song.artist}</span>
              </label>
            </div>
          `).join('')}
        </div>
        <div class="modal-actions">
          <button class="save-btn">Save</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Handle save
    modal.querySelector('.save-btn').addEventListener('click', () => {
      const selectedSongs = Array.from(modal.querySelectorAll('input:checked')).map(checkbox => {
        const songItem = checkbox.closest('.song-item');
        const title = songItem.dataset.title;
        return allSongs.find(song => song.title === title);
      });
      playlist.songs = selectedSongs;
      showPlaylist(playlist);
      modal.remove();
    });

    // Handle cancel
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
      modal.remove();
    });
  }

  function showLikedSongs() {
    const contentArea = document.querySelector('.content');
    contentArea.innerHTML = `
      <header>
        <div class="header-buttons">
          <button class="nav-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="nav-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="user-menu">
          <button class="upgrade-btn">Upgrade</button>
          <button class="profile-btn">
            <img src="https://via.placeholder.com/28" alt="Profile" class="profile-img">
            Username
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
      </header>
      <section class="liked-songs-view">
        <h1>Liked Songs</h1>
        <div class="card-grid">
          ${likedSongs.map(song => createSongCard(song)).join('')}
        </div>
      </section>
    `;
    
    initializePlayButtons();
    initializeCardHoverEffects();
  }

  function updateLikeButton() {
    const likeBtn = document.querySelector('.like-btn');
    if (likeBtn) {
      const currentSong = {
        title: document.querySelector('.track-name').textContent,
        artist: document.querySelector('.artist-name').textContent,
        audio: currentAudio?.src.split('/').pop(),
        cover: document.querySelector('.now-playing img').src
      };

      const isLiked = likedSongs.some(song => song.title === currentSong.title);
      const icon = likeBtn.querySelector('i');
      icon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';

      likeBtn.onclick = () => {
        if (isLiked) {
          likedSongs = likedSongs.filter(song => song.title !== currentSong.title);
          icon.className = 'far fa-heart';
        } else {
          likedSongs.push(currentSong);
          icon.className = 'fas fa-heart';
        }
      };
    }
  }

  // Update the play button click handler to include like button functionality
  const oldInitializePlayButtons = initializePlayButtons;
  initializePlayButtons = function() {
    oldInitializePlayButtons();
    updateLikeButton();
  };

  function createSearchResults(searchTerm) {
    const songs = getAllSongs();
    const filteredSongs = songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const searchGrid = document.querySelector('.search-results .card-grid');
    if (searchGrid) {
      searchGrid.innerHTML = filteredSongs.map(song => createSongCard(song)).join('');
      initializePlayButtons();
      initializeCardHoverEffects();
    } else {
      cardGrid.innerHTML = filteredSongs.map(song => createSongCard(song)).join('');
      initializePlayButtons();
      initializeCardHoverEffects();
    }
  }

  // Add search UI elements
  const searchNav = document.querySelector('.nav-links li:nth-child(2)');
  searchNav.addEventListener('click', () => {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-links li').forEach(item => item.classList.remove('active'));
    searchNav.classList.add('active');
    
    // Replace content area with search interface
    const contentArea = document.querySelector('.content');
    contentArea.innerHTML = `
      <header>
        <div class="header-buttons">
          <button class="nav-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="nav-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="search-container">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="What do you want to listen to?" id="searchInput">
          </div>
        </div>
        <div class="user-menu">
          <button class="upgrade-btn">Upgrade</button>
          <button class="profile-btn">
            <img src="https://via.placeholder.com/28" alt="Profile" class="profile-img">
            Username
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
      </header>
      <section class="search-results">
        <h2>Search Results</h2>
        <div class="card-grid"></div>
      </section>
    `;

    // Initialize search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      createSearchResults(e.target.value);
    });

    // Show all songs initially
    createSearchResults('');
  });

  // Add event listeners for playlist and liked songs buttons
  document.querySelector('.create-playlist').addEventListener('click', createPlaylist);
  document.querySelector('.liked-songs').addEventListener('click', showLikedSongs);

  // Add home button functionality to restore original view
  const homeNav = document.querySelector('.nav-links li:first-child');
  homeNav.addEventListener('click', () => {
    location.reload(); // Simple solution to restore original state
  });

  const libraryNav = document.querySelector('.nav-links li:nth-child(3)');
  libraryNav.addEventListener('click', () => {
    document.querySelectorAll('.nav-links li').forEach(item => item.classList.remove('active'));
    libraryNav.classList.add('active');
    showLibrary();
  });

  function showLibrary() {
    const contentArea = document.querySelector('.content');
    contentArea.innerHTML = `
      <header>
        <div class="header-buttons">
          <button class="nav-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="nav-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="user-menu">
          <button class="upgrade-btn">Upgrade</button>
          <button class="profile-btn" id="profileButton">
            <img src="${document.getElementById('currentProfilePic').src}" alt="Profile" class="profile-img">
            <span id="currentUsername">${document.getElementById('currentUsername').textContent}</span>
            <i class="fas fa-caret-down"></i>
          </button>
        </div>
      </header>
      <section class="virtual-library">
        <h1>Universal History Library</h1>
        <div class="library-nav">
          <button class="library-nav-btn active" data-view="overview">Overview</button>
          <button class="library-nav-btn" data-view="articles">Articles</button>
          <button class="library-nav-btn" data-view="gallery">Gallery</button>
        </div>
        <div class="library-content">
          ${getLibraryOverview()}
        </div>
      </section>
    `;

    initializeLibraryNavigation();
  }

  function getLibraryOverview() {
    return `
      <div class="library-sections">
        ${libraryData.sections.map(section => `
          <div class="library-section" data-section="${section.id}">
            <div class="section-image">
              <i class="fas fa-book-open"></i>
            </div>
            <div class="section-info">
              <h3>${section.title}</h3>
              <p>${section.articles.length} articles • ${section.gallery.length} gallery items</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function showArticle(articleId, sectionId) {
    const section = libraryData.sections.find(s => s.id === sectionId);
    const article = section.articles.find(a => a.id === articleId);
    
    const contentArea = document.querySelector('.library-content');
    contentArea.innerHTML = `
      <div class="article-view">
        <article class="main-article">
          <header class="article-header">
            <h1>${article.title}</h1>
            <h2>${article.subtitle}</h2>
          </header>
          
          <div class="article-content">
            ${article.content.map(block => {
              switch(block.type) {
                case 'paragraph':
                  return `<p>${block.text}</p>`;
                case 'subheading':
                  return `<h3>${block.text}</h3>`;
                case 'image':
                  return `
                    <figure>
                      <img src="${block.url}" alt="${block.caption}">
                      <figcaption>${block.caption}</figcaption>
                    </figure>
                  `;
                default:
                  return '';
              }
            }).join('')}
          </div>
        </article>
        
        <aside class="related-articles">
          <h3>Related Articles</h3>
          <div class="related-articles-grid">
            ${article.relatedArticles.map(relatedId => {
              const related = section.articles.find(a => a.id === relatedId);
              return `
                <div class="related-article-card" onclick="showArticle('${relatedId}', '${sectionId}')">
                  <h4>${related.title}</h4>
                  <p>${related.preview}</p>
                  <button class="read-more-btn">Read More</button>
                </div>
              `;
            }).join('')}
          </div>
        </aside>
      </div>
    `;
  }

  function getLibraryArticles() {
    return `
      <div class="articles-grid">
        ${libraryData.sections.flatMap(section => 
          section.articles.map(article => `
            <div class="article-card" onclick="showArticle('${article.id}', '${section.id}')">
              <div class="article-icon">
                <i class="fas fa-scroll"></i>
              </div>
              <h3>${article.title}</h3>
              <p>${article.preview}</p>
              <button class="read-more-btn">Read More</button>
            </div>
          `)
        ).join('')}
      </div>
    `;
  }

  function getLibraryGallery() {
    return `
      <div class="gallery-grid">
        ${libraryData.sections.flatMap(section =>
          section.gallery.map(item => `
            <div class="gallery-card">
              <div class="gallery-icon">
                <i class="fas fa-landmark"></i>
              </div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          `)
        ).join('')}
      </div>
    `;
  }

  function initializeLibraryNavigation() {
    const navButtons = document.querySelectorAll('.library-nav-btn');
    const libraryContent = document.querySelector('.library-content');

    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const view = button.dataset.view;
        switch(view) {
          case 'overview':
            libraryContent.innerHTML = getLibraryOverview();
            break;
          case 'articles':
            libraryContent.innerHTML = getLibraryArticles();
            break;
          case 'gallery':
            libraryContent.innerHTML = getLibraryGallery();
            break;
        }
      });
    });
  }

  // Initialize all interactive elements
  initializePlayButtons();
  initializeCardHoverEffects();
});