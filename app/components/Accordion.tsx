import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './styles.css';
import Wrapper from '@/app/components/wrapper';


interface AccordionProps {
    children: React.ReactNode;
    className?: string;
}

interface Nomination {
    id: number;
    name: string;
    votes: number;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger
                className={classNames('AccordionTrigger', className)}
                {...props}
                ref={forwardedRef as React.MutableRefObject<HTMLButtonElement>}
            >
                {children}
                <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames('AccordionContent', className)}
            {...props}
            ref={forwardedRef}
        >
            <div className="AccordionContentText">{children}</div>
        </Accordion.Content>
    )
);

AccordionContent.displayName = 'AccordionContent';

const AccordionExample = ({ data, onVote }: { data: any; onVote: (nominationId: number) => void }) => {
    return (
        <Accordion.Root className="AccordionRoot" type="multiple">
            <Accordion.Item className="AccordionItem" value="item-1">
                <AccordionTrigger>{data.name}</AccordionTrigger>
                <AccordionContent>
                    {
                        data.contestants.map((option: Nomination) => (
                            <div key={option.id} className="flex justify-between items-center flex-col py-2 sm:flex-row sm:px-4 sm:py-4 p-0 border-b border-solid border-gray-200">
                                <div>
                                    <h1 className="text-xl font-semibold md:text-left text-center">{option.name}</h1>
                                    <p className="text-lg sm:text-left text-center">Голосов: <b>{option.votes}</b></p>
                                </div>
                                <div>
                                    <Wrapper onVote={onVote} optionId={option.id} />
                                    {/* <button onClick={() => setIsModalOpen(!isModalOpen)} className="px-4 py-2 bg-[#336AEA] text-white rounded-lg sm:m-0 mt-4" type="submit">Голосовать</button> */}
                                </div>
                            </div>
                        ))
                    }
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};


export default AccordionExample;
