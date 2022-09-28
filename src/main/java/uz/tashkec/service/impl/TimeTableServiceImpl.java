package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.TimeTable;
import uz.tashkec.repository.TimeTableRepository;
import uz.tashkec.service.TimeTableService;
import uz.tashkec.service.dto.TimeTableDTO;
import uz.tashkec.service.mapper.TimeTableMapper;

/**
 * Service Implementation for managing {@link TimeTable}.
 */
@Service
@Transactional
public class TimeTableServiceImpl implements TimeTableService {

    private final Logger log = LoggerFactory.getLogger(TimeTableServiceImpl.class);

    private final TimeTableRepository timeTableRepository;

    private final TimeTableMapper timeTableMapper;

    public TimeTableServiceImpl(TimeTableRepository timeTableRepository, TimeTableMapper timeTableMapper) {
        this.timeTableRepository = timeTableRepository;
        this.timeTableMapper = timeTableMapper;
    }

    @Override
    public TimeTableDTO save(TimeTableDTO timeTableDTO) {
        log.debug("Request to save TimeTable : {}", timeTableDTO);
        TimeTable timeTable = timeTableMapper.toEntity(timeTableDTO);
        timeTable = timeTableRepository.save(timeTable);
        return timeTableMapper.toDto(timeTable);
    }

    @Override
    public TimeTableDTO update(TimeTableDTO timeTableDTO) {
        log.debug("Request to update TimeTable : {}", timeTableDTO);
        TimeTable timeTable = timeTableMapper.toEntity(timeTableDTO);
        timeTable = timeTableRepository.save(timeTable);
        return timeTableMapper.toDto(timeTable);
    }

    @Override
    public Optional<TimeTableDTO> partialUpdate(TimeTableDTO timeTableDTO) {
        log.debug("Request to partially update TimeTable : {}", timeTableDTO);

        return timeTableRepository
            .findById(timeTableDTO.getId())
            .map(existingTimeTable -> {
                timeTableMapper.partialUpdate(existingTimeTable, timeTableDTO);

                return existingTimeTable;
            })
            .map(timeTableRepository::save)
            .map(timeTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TimeTableDTO> findAll() {
        log.debug("Request to get all TimeTables");
        return timeTableRepository.findAll().stream().map(timeTableMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TimeTableDTO> findOne(Long id) {
        log.debug("Request to get TimeTable : {}", id);
        return timeTableRepository.findById(id).map(timeTableMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TimeTable : {}", id);
        timeTableRepository.deleteById(id);
    }
}
