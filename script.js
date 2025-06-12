// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }),
    )
  }

  // Smooth scrolling
  window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  // Update navbar on scroll
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)"
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        navbar.style.boxShadow = "none"
      }
    })
  }

  // Live score updates (simulated)
  function updateLiveScores() {
    const liveScoreElements = document.querySelectorAll(".team-score")
    if (liveScoreElements && liveScoreElements.length > 0) {
      // Find the India score element
      liveScoreElements.forEach((element) => {
        if (
          element.textContent.includes("185/4") ||
          element.textContent.includes("189/4") ||
          element.textContent.includes("192/5") ||
          element.textContent.includes("195/5")
        ) {
          // Simulate score updates
          const scores = ["185/4 (18.2)", "189/4 (18.4)", "192/5 (19.0)", "195/5 (19.2)"]
          const randomScore = scores[Math.floor(Math.random() * scores.length)]
          element.textContent = randomScore
        }
      })
    }
  }

  // Update live scores every 30 seconds
  setInterval(updateLiveScores, 30000)

  // Cricket Trivia Game
  const triviaQuestions = [
    {
      question: "Who is known as the 'Captain Cool' of Indian cricket?",
      options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Sourav Ganguly"],
      correct: 1,
    },
    {
      question: "In which year did India win their first Cricket World Cup?",
      options: ["1975", "1979", "1983", "1987"],
      correct: 2,
    },
    {
      question: "Who holds the record for the highest individual score in ODIs?",
      options: ["Rohit Sharma", "Virat Kohli", "Chris Gayle", "Martin Guptill"],
      correct: 0,
    },
    {
      question: "Which Indian bowler is known as the 'Turbanator'?",
      options: ["Kapil Dev", "Harbhajan Singh", "Anil Kumble", "Bishan Singh Bedi"],
      correct: 1,
    },
    {
      question: "What is the maximum number of overs a bowler can bowl in a T20 match?",
      options: ["3", "4", "5", "6"],
      correct: 1,
    },
  ]

  let currentQuestion = 0
  let score = 0
  let quizActive = false

  const triviaQuestion = document.getElementById("triviaQuestion")
  const triviaOptions = document.getElementById("triviaOptions")
  const startQuizBtn = document.getElementById("startQuiz")
  const nextQuestionBtn = document.getElementById("nextQuestion")
  const triviaScoreElement = document.getElementById("triviaScore")

  function startQuiz() {
    currentQuestion = 0
    score = 0
    quizActive = true
    if (startQuizBtn) startQuizBtn.style.display = "none"
    if (nextQuestionBtn) nextQuestionBtn.style.display = "none"
    updateScore()
    showQuestion()
  }

  function showQuestion() {
    if (currentQuestion >= triviaQuestions.length) {
      endQuiz()
      return
    }

    const question = triviaQuestions[currentQuestion]
    if (triviaQuestion) triviaQuestion.textContent = question.question

    if (triviaOptions) {
      triviaOptions.innerHTML = ""

      question.options.forEach((option, index) => {
        const optionElement = document.createElement("div")
        optionElement.className = "option"
        optionElement.textContent = option
        optionElement.onclick = () => selectAnswer(index)
        triviaOptions.appendChild(optionElement)
      })
    }
  }

  function selectAnswer(selectedIndex) {
    if (!quizActive) return

    const question = triviaQuestions[currentQuestion]
    const options = document.querySelectorAll(".option")

    options.forEach((option, index) => {
      if (index === question.correct) {
        option.classList.add("correct")
      } else if (index === selectedIndex && index !== question.correct) {
        option.classList.add("incorrect")
      }
      option.onclick = null // Disable further clicks
    })

    if (selectedIndex === question.correct) {
      score++
      updateScore()
    }

    setTimeout(() => {
      currentQuestion++
      if (currentQuestion < triviaQuestions.length) {
        if (nextQuestionBtn) nextQuestionBtn.style.display = "inline-block"
      } else {
        endQuiz()
      }
    }, 1500)
  }

  function nextQuestion() {
    if (nextQuestionBtn) nextQuestionBtn.style.display = "none"
    showQuestion()
  }

  function endQuiz() {
    quizActive = false
    if (triviaQuestion) {
      triviaQuestion.textContent = `Quiz Complete! You scored ${score} out of ${triviaQuestions.length}. ${getScoreMessage()}`
    }
    if (triviaOptions) triviaOptions.innerHTML = ""
    if (startQuizBtn) {
      startQuizBtn.style.display = "inline-block"
      startQuizBtn.textContent = "Play Again"
    }
    if (nextQuestionBtn) nextQuestionBtn.style.display = "none"
  }

  function getScoreMessage() {
    const percentage = (score / triviaQuestions.length) * 100
    if (percentage === 100) return "Perfect! You're a cricket genius! 🏆"
    if (percentage >= 80) return "Excellent! You know your cricket! 🎉"
    if (percentage >= 60) return "Good job! Keep following cricket! 👏"
    if (percentage >= 40) return "Not bad! Time to brush up on cricket knowledge! 📚"
    return "Keep watching cricket and try again! 🏏"
  }

  function updateScore() {
    if (triviaScoreElement) triviaScoreElement.textContent = score
  }

  // Event listeners for trivia
  if (startQuizBtn) startQuizBtn.addEventListener("click", startQuiz)
  if (nextQuestionBtn) nextQuestionBtn.addEventListener("click", nextQuestion)

  // Player details modal
  const playerData = {
    virat: {
      name: "Virat Kohli",
      role: "Captain • Batsman",
      image: "https://imgs.search.brave.com/NYUbn2p-UtaBYM3Y3vFzdp1nk7FfJkBVV0-sMG2ydq8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS90aHVtYi9tc2lk/LTEyMTY3OTM0Myxp/bWdzaXplLTM1OTky/LHdpZHRoLTQwMCxy/ZXNpemVtb2RlLTQv/MTIxNjc5MzQzLmpw/Zw",
      stats: {
        "ODI Runs": "14181",
        "ODI Centuries": "51",
        "T20I Runs": "4188",
        "Test Runs": "9230",
        Average: "57.88",
        "Strike Rate": "93.34",
      },
      bio: "Virat Kohli is an Indian international cricketer and former captain of the Indian national team. Widely regarded as one of the greatest batsmen of all time, Kohli holds numerous records and has been the backbone of Indian batting for over a decade.",
    },
    rohit: {
      name: "Rohit Sharma",
      role: "Vice Captain • Batsman",
      image: "https://via.placeholder.com/300",
      stats: {
        "ODI Runs": "9,825",
        "ODI Centuries": "30",
        "T20I Runs": "3,379",
        "Test Runs": "3,137",
        Average: "48.96",
        "Strike Rate": "88.90",
      },
      bio: "Rohit Sharma is an Indian international cricketer and current captain of the Indian cricket team. Known for his elegant batting style and ability to score big hundreds, he holds the record for the highest individual score in ODIs.",
    },
    bumrah: {
      name: "Jasprit Bumrah",
      role: "Bowler",
      image: "https://via.placeholder.com/300",
      stats: {
        "ODI Wickets": "132",
        "Economy Rate": "4.63",
        "T20I Wickets": "70",
        "Test Wickets": "128",
        "Best Bowling": "6/19",
        Average: "20.06",
      },
      bio: "Jasprit Bumrah is an Indian international cricketer who plays for the Indian cricket team in all formats. Known for his unique bowling action and deadly yorkers, he is considered one of the best fast bowlers in world cricket.",
    },
  }

  // Make showPlayerDetails available globally
  window.showPlayerDetails = (playerId) => {
    const player = playerData[playerId]
    if (!player) return

    const modal = document.getElementById("playerModal")
    const playerDetails = document.getElementById("playerDetails")

    if (modal && playerDetails) {
      playerDetails.innerHTML = `
                <div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem;">
                    <img src="${player.image}" alt="${player.name}" style="width: 200px; height: 200px; object-fit: cover; border-radius: 15px;">
                    <div>
                        <h2 style="color: #333; margin-bottom: 0.5rem;">${player.name}</h2>
                        <p style="color: #6c757d; font-size: 1.1rem; margin-bottom: 1rem;">${player.role}</p>
                        <p style="line-height: 1.6; color: #555;">${player.bio}</p>
                    </div>
                </div>
                <div>
                    <h3 style="color: #FF6B35; margin-bottom: 1rem;">Career Statistics</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        ${Object.entries(player.stats)
                          .map(
                            ([key, value]) => `
                            <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: #FF6B35;">${value}</div>
                                <div style="font-size: 0.9rem; color: #6c757d;">${key}</div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            `

      modal.style.display = "block"
    }
  }

  // Modal close functionality
  const closeButton = document.querySelector(".close")
  const playerModal = document.getElementById("playerModal")

  if (closeButton && playerModal) {
    closeButton.addEventListener("click", () => {
      playerModal.style.display = "none"
    })

    window.addEventListener("click", (event) => {
      if (event.target === playerModal) {
        playerModal.style.display = "none"
      }
    })
  }

  // Intersection Observer for animations
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".match-card, .player-card, .news-card")
    animateElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  }

  // Add some dynamic content updates
  function addDynamicContent() {
    // Simulate live commentary updates
    const matchInfo = document.querySelector(".match-info p")
    if (matchInfo && matchInfo.textContent.includes("India need")) {
      const updates = [
        "India need 44 runs in 22 balls",
        "India need 38 runs in 18 balls",
        "India need 32 runs in 15 balls",
        "India need 25 runs in 12 balls",
      ]

      setInterval(() => {
        const randomUpdate = updates[Math.floor(Math.random() * updates.length)]
        matchInfo.textContent = randomUpdate
      }, 45000)
    }
  }

  // Initialize dynamic content
  addDynamicContent()

  // Add keyboard navigation for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("playerModal")
      if (modal && modal.style.display === "block") {
        modal.style.display = "none"
      }
    }
  })

  // Performance optimization: Lazy load images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.add("loaded")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    const images = document.querySelectorAll("img[data-src]")
    images.forEach((img) => imageObserver.observe(img))
  }
})
