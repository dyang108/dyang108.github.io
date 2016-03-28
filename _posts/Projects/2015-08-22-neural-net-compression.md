---
layout: post
title: Image Compression with Neural Nets
category: projects 
date: 2015-08-22
---

So I am actually writing this in March 2016, but the actual work was done in summer of last year. I worked in the lab at the University of Rhode Island, learning about artificial intelligence and machine learning algorithms. To be honest, the experience was basically an overarching survey of a lot of complex algorithms involving linear algebra and statistics. Luckily for me, I had taken linear the semester before my summer at URI, but I still had to play a lot of catch-up while I was there.

At the very start of the summer, I built an algorithm that could win or tie at tic-tac-toe against any human player, using reinforcement learning. I then wanted to spend some time working with neural networks, a very hot topic right now in machine learning. So I spent some time building sign-recognition algorithms with single-layer perceptrons, followed my more complicated multilayer neural networks.

So it actually turns out that there are more uses to neural networks than meets the eye. Neural networks essentially take very high-dimensional data and break things down to several features that may or may not be recognizable by a human. For example, run a million 200x200 pixel faces through a neural network properly, with twenty output nodes, and one of the output nodes might be the relative size of a person's nose compared to the other 999,999 people that were run through the network, while another might be the precise tone of the person's skin.

And just as you can reduce a person's face to 20 numbers, you can turn 20 numbers into a person's face, with the same weights, going backwards. And this is the concept behind neural network image compression. As long as we know what sort of thing an image is of (a face, a tree, a sign), we can compress it into a simple, relatively small vector, as long as we store the structure and the weights in the connections of our neural network.

So I built a multilayer neural network image compressor using RBM's to compress and decompress an image. Classifying each image into its own category, my computer was able to compress and decompress faces into vectors only 20 numbers long, significantly smaller than the input image.
