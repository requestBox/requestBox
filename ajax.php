<?php

//sleep(1);

switch($_POST['action']) {

	case 'request':
		echo json_encode(array(
			'requests' => array(
				array(
					'title' => 'Lorem Ipsum 1',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				),
				array(
					'title' => 'Lorem Ipsum 2',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				),
				array(
					'title' => 'Lorem Ipsum 3',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				),
				array(
					'title' => 'Lorem Ipsum 4',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				),
				array(
					'title' => 'Lorem Ipsum 5',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				),
				array(
					'title' => 'Lorem Ipsum 6',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				),
				array(
					'title' => 'Lorem Ipsum 7',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Someone famous',
					'votes_count' => '12345'
				)
			)
		));

		break;

	case 'comment':
		echo json_encode(array(
			'comments' => array(
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				),
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				),
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				),
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				),
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				),
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				),
				array(
					'comment' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor ante. Cras posuere, urna ut vulputate pretium.',
					'name' => 'Another famous person'
				)
			)
		));

		break;

}

?>