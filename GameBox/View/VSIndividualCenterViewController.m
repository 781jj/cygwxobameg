//
//  VSIndividualCenterViewController.m
//  GameBox
//
//  Created by YaoMing on 14-10-8.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSIndividualCenterViewController.h"

@interface VSIndividualCenterViewController ()
@property (nonatomic,weak)IBOutlet UIImageView *photo;
@property (nonatomic,weak)IBOutlet UILabel *nameLabel;
@property (nonatomic,weak)IBOutlet UIView *errorView;

@end

@implementation VSIndividualCenterViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _photo.layer.masksToBounds = YES;
    _photo.layer.cornerRadius = _photo.frame.size.width/2.0;
    
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)editPerson:(id)sender
{
    
}

@end
