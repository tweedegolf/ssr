export default {
    animals: {
        label: 'Animals',
        vertebrates: {
            label: 'Vertebrates',
            summary: 'These are animals that have a backbone',
            reptiles: {
                label: 'Reptiles',
                summary: 'Have a dry scaly skin. Leg eggs on dry land. Are cold blooded.',
                examples: ['Snake', 'Crocodile'],
            },
            fish: {
                label: 'Fish',
                summary: 'Have scales on their bodies. Have grills for breathing. Are cold blooded',
                examples: ['Shark', 'Tuna'],
            },
            amphibians: {
                label: 'Amphibians',
                summary: 'Have moist slimy skin. Lay eggs in water. Are cold blooded.',
                examples: ['Frog', 'Newt'],
            },
            birds: {
                label: 'Birds',
                summary: 'Have feathers and wings. Have beaks and lay eggs. Are warm blooded.',
                examples: ['Wren', 'Swan'],
            },
            mammals: {
                label: 'Mammals',
                summary: 'Have fur or hair. Feed young with milk. Are warm blooded.',
                examples: ['Cow', 'Human'],
            },
        },
        invertebrates: {
            label: 'Invertebrates',
            protozoa: {
                label: 'Protozoa',
                summary: 'Single cell organisms all microscopic.',
                examples: ['Flagellata', 'Chiliophora'],
            },
            flatworms: {
                label: 'Flatworms',
                summary: 'Simple and soft bodied.',
                examples: ['Tape worm', 'Flukes'],
            },
            annelid_worms: {
                label: 'Annelid worms',
                summary: 'Segmented bodies.',
                examples: ['Earthworm', 'Leech'],
            },
            echinoderms: {
                label: 'Echinoderms',
                summary: 'Spiny sea creatures.',
                examples: ['Starfish', 'Sea urchin'],
            },
            coelenterates: {
                label: 'Coelenterates',
                summary: 'Soft bodies. Stinging cells.',
                examples: ['Jellyfish', 'Sea anemone'],
            },
            molluscs: {
                label: 'Molluscs',
                summary: 'Soft bodied, most have shells.',
                examples: ['Snails', 'Limpet'],
            },
            arthropods: {
                label: 'Arhropods',
                summary: 'Hard external skeleton and jointed limbs',
                arachnids: {
                    label: 'Arachnids',
                    summary: 'Eigth legs, two body parts, no antennae.',
                    examples: ['Spider', 'Scorpion'],
                },
                crustaceans: {
                    label: 'Crustaceans',
                    summary: 'Mostly sea creatures. Many legs and two sets of antennae.',
                    examples: ['Crab', 'Lobster'],
                },
                insects: {
                    label: 'Insects',
                    summary: 'Wings, six legs, three body parts, one pair of antennae.',
                    examples: ['Bee', 'Ladybird'],
                },
                myriapods: {
                    label: 'Myriapods',
                    summary: 'Many legs and body segments',
                    examples: ['Centipede', 'Millipede'],
                },
            },
        },
    },
};
