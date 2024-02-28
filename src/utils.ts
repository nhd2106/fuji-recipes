export const ingredients = [
    {
        key: "cameraModel",
        name: "Camera Model",
        type: "comboBox",
        default: "X-T3",
        options: [
            "XT-1",
            "XT-2",
            "XT-3",
            "XT-4",
            "XT-5",
            "XH-1",
            "XH-2",
            "X-Pro1",
            "X-Pro2",
            "X-Pro3",
            "X-Pro4",
            "X-E1",
            "X-E2",
            "X-E3",
            "X-E4",
            "X-T10",
            "X-T20",
            "X-T30",
            "X-T40",
            "X-T100",
            "X-T200",
            "X-T300",
            "X-T400",
            "X-S10",
            "X-S20",
            "X-A1",
            "X-A2",
            "X-A3",
            "X-A4",
            "X-A5",
            "X-A6",
            "X-A7",
            "X-100",
            "X-100S",
            "X-100T",
            "X-100V",
            "X-100F",
            "X-70",
            "X-30",
            "X-20",
            "X-10",
            "X-M1",
            "X-M2",            
        ],
    }
    ,
    {
        key: 'filmSimulation',
        name: 'Film Simulation',
        type: 'select',
        default: 'Provia',
        options: [
            'Provia/Standard',
            'Velvia',
            'Astia',
            'Classic Chrome',
            'Pro Negative Std',
            'Classic Neg',
            'Pro Negative Hi',
            'Pro Negative Std',
            'Eterna',
            'Acros',
            'Acros+Ye',
            'Acros+R',
            'Acros+G',
            'Acros+G',
            'Monochrome',
            'Sepia',
        ]
    },
    {
        key: 'monochrommaticColor',
        name: 'Monochrommatic Color',
        type: 'select',
        default: 'R',
        options: [
            'R',
            'G',
            'B',
            'Y',
            'O',
            'P',
            'G+R',
            'B+Y',
            'R+Y',
            'R+G',
            'B+R',
            'B+G',
            'R+G+B',
            'R+G+B+Y',
            'Off'
        ]

    },
    
    {
        key: 'colorChromeEffect',
        name: 'Color Chrome Effect',
        type: 'select',
        default: 'Off',
        options: [
            'Strong',
            'Weak',
            'Off'
        ]

    },
    {
        key: 'colorChromeFxBlue',
        name: 'Color Chrome FX Blue',
        type: 'select',
        default: 'Off',
        options: [
            'Strong',
            'Weak',
            'Off'
        ]
    },
    {
        name: 'Grain Effect',
        key: 'grainEffect',
        type: 'select',
        child: [
            {
                name: 'Roughness',
                key: 'roughness',
                type: 'select',
                default: 'Off',
                options: [
                    'Weak',
                    'Strong',
                    'Off'
                ]

            },
            {
                name: 'Size',
                key: 'size',
                type: 'select',
                default: 'Small',
                options: [
                    'Small',
                    'Large'
                ]

            },
        ]
    },
    {
        key: 'dynamicRange',
        name: 'Dynamic Range',
        type: 'select',
        default: 'Auto',
        options: [
            'Auto',
            '100%',
            '200%',
            '400%'
        ]
    },
    {
        key: 'whiteBalance',
        name: 'White Balance',
        type: 'select',
        default: 'Auto',
        options: [
            'Auto',
            'Custom',
            'Daylight',
            'Shade',
            'Fluorescent',
            'Incandescent',
            'Underwater'
        ]
    },
    {
        key: 'dRangePriority',
        name: 'D Range Priority',
        type: 'select',
        default: 'Auto',
        options: [
            'Auto',
            '100%',
            '200%',
            '400%'
        ]
    },
   
    {
        key: 'color',
        name: 'Color',
        type: 'select',
        default: '0',
        options: [
            '+4',
            '+3',
            '+2',
            '+1',
            '0',
            '-1',
            '-2',
            '-3',
            '-4'
        ]
    
    }, 
    {
        key: 'toneCurve',
        name: 'Tone Curve',
        type: 'select',
        child: [
            {
                name: 'Highlight',
                key: 'highlight',
                type: 'select',
                default: '0',
                options: [
                    '+4',
                    '+3',
                    '+2',
                    '+1',
                    '0',
                    '-1',
                    '-2',
                    '-3',
                    '-4'
                ]
            },
            {
                name: 'Shadow',
                key: 'shadow',
                type: 'select',
                default: '0',
                options: [
                    '+4',
                    '+3',
                    '+2',
                    '+1',
                    '0',
                    '-1',
                    '-2',
                    '-3',
                    '-4'
                ]
            },
        ]
    }, 
    {
        key: 'sharpness',
        name: 'Sharpness',
        type: 'select',
        default: '0',
        options: [
            '+4',
            '+3',
            '+2',
            '+1',
            '0',
            '-1',
            '-2',
            '-3',
            '-4'
        ]
    }, 
    {
        key: 'noiseReduction',
        name: 'Noise Reduction',
        type: 'select',
        default: '0',
        options: [
            '+4',
            '+3',
            '+2',
            '+1',
            '0',
            '-1',
            '-2',
            '-3',
            '-4'
        ]
    }, 
    {
        key: 'clarity',
        name: 'Clarity',
        type: 'select',
        default: '0',
        options: [
            '+5',
            '+4',
            '+3',
            '+2',
            '+1',
            '0',
            '-1',
            '-2',
            '-3',
            '-4',
            '-5'
        ]
    },
    {
        key: 'longExposureNoiseReduction',
        name: 'Long Exposure Noise Reduction',
        type: 'checkbox',
    },
    {
        key: 'colorSpace',
        name: 'Color Space',
        type: 'select',
        options: [
            'sRGB',
            'AdobeRGB'
        ],
        default: 'sRGB'
    },
    {
        key: 'pixelMapping',
        name: 'Pixel Mapping',
    }
]

export const parsedFields = [
    'grainEffect',
    'toneCurve',


]