install-cv-prereqs:
    sudo apt install pandoc texlive

cv:
    pandoc pages/cv/cv.mdx -o output.pdf