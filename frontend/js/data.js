export default [{
    label: 'Animals',
    summary: 'This is the grouping together of animals with similar characteristics. Animals can be classed as either vertebrates and invertebrates',
    subcategories: [{
        label: 'Vertebrates',
        summary: 'These are animals that have a backbone',
        subcategories: [{
            label: 'Reptiles',
            summary: 'Have a dry scaly skin. Leg eggs on dry land. Are cold blooded.',
            examples: ['Snake', 'Crocodile'],
        }, {
            label: 'Fish',
            summary: 'Have scales on their bodies. Have grills for breathing. Are cold blooded',
            examples: ['Shark', 'Tuna'],
        }, {
            label: 'Amphibians',
            summary: 'Have moist slimy skin. Lay eggs in water. Are cold blooded.',
            examples: ['Frog', 'Newt'],
        }, {
            label: 'Birds',
            summary: 'Have feathers and wings. Have beaks and lay eggs. Are warm blooded.',
            examples: ['Wren', 'Swan'],
        }, {
            label: 'Mammals',
            summary: 'Have fur or hair. Feed young with milk. Are warm blooded.',
            examples: ['Cow', 'Human'],
        }],
    }, {
        label: 'Invertebrates',
        summary: 'These are animals that do not have a backbone',
        subcategories: [{
            label: 'Protozoa',
            summary: 'Single cell organisms all microscopic.',
            examples: ['Flagellata', 'Chiliophora'],
        }, {
            label: 'Flatworms',
            summary: 'Simple and soft bodied.',
            examples: ['Tape worm', 'Flukes'],
        }, {
            label: 'Annelid worms',
            summary: 'Segmented bodies.',
            examples: ['Earthworm', 'Leech'],
        }, {
            label: 'Echinoderms',
            summary: 'Spiny sea creatures.',
            examples: ['Starfish', 'Sea urchin'],
        }, {
            label: 'Coelenterates',
            summary: 'Soft bodies. Stinging cells.',
            examples: ['Jellyfish', 'Sea anemone'],
        }, {
            label: 'Molluscs',
            summary: 'Soft bodied, most have shells.',
            examples: ['Snails', 'Limpet'],
        }, {
            label: 'Arhropods',
            summary: 'Hard external skeleton and jointed limbs',
            subcategories: [{
                label: 'Arachnids',
                summary: 'Eigth legs, two body parts, no antennae.',
                examples: ['Spider', 'Scorpion'],
            }, {
                label: 'Crustaceans',
                summary: 'Mostly sea creatures. Many legs and two sets of antennae.',
                examples: ['Crab', 'Lobster'],
            }, {
                label: 'Insects',
                summary: 'Wings, six legs, three body parts, one pair of antennae.',
                examples: ['Bee', 'Ladybird'],
            }, {
                label: 'Myriapods',
                summary: 'Many legs and body segments',
                examples: ['Centipede', 'Millipede'],
            }],
        }],
    }],
}];
