ROHAN PRABHASH - PORTFOLIO ASSETS GUIDE
========================================

HERO SECTION ASSETS:
--------------------
1. Superhero Mask Portrait (Layer 1):
   - Current Asset: public/photos/superhero_portrait.svg (Active default image asset)
   - To replace: Save your desired superhero artwork as "public/photos/superhero_portrait.svg" or ".jpg"

2. Civilian Real Face Portrait (Layer 2 - Unmasked):
   - Current Asset: public/photos/civilian_placeholder.svg (Active default placeholder)
   - In-App Customizer: Click "CUSTOMIZE FACE" on the hero card to upload your real face photo directly from your device (saved persistently in localStorage) or paste an image URL.
   - Alternatively: Save your photo as "public/photos/portrait.jpg"

HOW THE HOVER-TO-REVEAL INTERACTION WORKS:
------------------------------------------
- Desktop: Hovering over the superhero portrait reveals the civilian face layer. Moving the pointer away restores the masked layer.
- Mobile / Touch: Tapping the portrait toggles between the mask and civilian face.
- Manual Control: Clicking "UNMASK ⚡" / "WEAR MASK 🕷️" on the card toggles the state directly.
- Keyboard: Pressing Enter or Space while focused on the card toggles the state.
